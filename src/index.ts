import * as cheerio from 'cheerio';
import formatUri from './utils';

interface Metadata {
	metadata: {
		website: string;
		title: string;
		description: string | undefined;
		banner: string | undefined;
		themeColor: string | undefined;
	};
	socials: Record<string, string | undefined>;
	favicons: string[];
}

// Hard cap for pages that never yield a </head> or <body> marker
const MAX_BYTES = 1024 * 1024;

/*
  Streams the response body only until the document head has been received,
  then cancels the request. All the metadata we parse lives in <head>, so
  there is no need to download the full page.
*/
async function fetchHead(url: string): Promise<{ html: string; finalUrl: string }> {
	const response = await fetch(url);
	const finalUrl = response.url;

	if (!response.body) {
		return { html: await response.text(), finalUrl };
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let html = '';
	let bytes = 0;

	while (bytes < MAX_BYTES) {
		const { done, value } = await reader.read();
		if (done) return { html, finalUrl };
		bytes += value.byteLength;
		html += decoder.decode(value, { stream: true });
		// </head> is optional in valid HTML, so <body is the fallback marker
		if (/<\/head|<body/i.test(html)) break;
	}

	await reader.cancel().catch(() => {});
	return { html, finalUrl };
}

/*
  Fetches meta data of a given website url
  @param url | the website url to fetch the metadata from
*/
export default async function metaFetcher(url: string): Promise<Metadata> {
	const urlString: string = url.trim();

	const { html, finalUrl } = await fetchHead(urlString);

	// Load html to cheerio
	const $ = cheerio.load(html);
	const head = $('head');

	// Basic site meta-data
	const basicMeta = () => {
		const website: string = finalUrl;
		const title = head.find('title').text();
		const description = head.find('meta[name=description]').attr('content');
		const banner =
			head.find('meta[name="og:image"]').attr('content') ||
			head.find('meta[property="og:image"]').attr('content');
		const themeColor = head.find('meta[name="theme-color"]').attr('content');

		return {
			website,
			title,
			description,
			banner,
			themeColor,
		};
	};

	// Socials
	const fetchSocials = () => {
		const opengraphArray = head.find('meta[property]');
		const opengraph: Record<string, string | undefined> = {};
		opengraphArray.each((_, element) => {
			const property = $(element).attr('property');
			const content = $(element).attr('content');
			if (property?.includes('twitter') && !property?.includes('card')) {
				opengraph[property] = content;
			}
		});

		return opengraph;
	};

	// Favicons
	const fetchFavicons = (): string[] => {
		const faviconArray = head.find('link[rel]');
		const favicons: string[] = [];

		faviconArray.each((_, element) => {
			const href = $(element).attr('href');
			const rel = $(element).attr('rel');

			if (
				href &&
				(rel?.includes('icon') || rel?.includes('apple-touch-startup-image'))
			) {
				const validUri = formatUri(finalUrl, href);
				favicons.push(validUri);
			}
		});
		return favicons;
	};

	// Meta-data
	const metadata = basicMeta();
	const socials = fetchSocials();
	const favicons = fetchFavicons();

	const metaData = {
		metadata,
		socials,
		favicons,
	};

	return metaData;
}
