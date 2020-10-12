'use strict';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import {createValidUri} from './util';

/**
 *  Fetches meta data of a given website url
 * @param url | the website url to fetch the metadata from
 */
export const fetchMetaData = async (url: string, _options?: Options): Promise<Record<string, unknown>> => {
	try {
		const urlString: string = url.trim();

		// Options validation
		if (!_options || typeof _options !== 'object') {
			_options = {};
		}

		const options = {
			userAgent: _options.userAgent ?? 'meta-fetch',
			fromEmail: _options.fromEmail ?? 'metafetch@email.com'
		};

		const requestOptions = {
			method: 'GET',
			headers: {
				'User-Agent': options.userAgent,
				'From': options.fromEmail
			}
		};

		const response = await fetch(urlString, requestOptions);
		const content = await response.text();

		// Load html to cheerio
		const $ = cheerio.load(content);
		const head = $('head');

		// Basic site meta-data
		const basicMeta = (): Record<string, unknown> => {
			const website = response.url;
			const title = head.find('title').text();
			const desc = head.find('meta[name=description]').attr('content');

			return {
				website,
				title,
				description: desc
			};
		};

		// Open graph basic
		const fetchMeta = (): Record<string, unknown> => {
			const openGraphsArray = head.find('meta[property]');
			const openGraphs = {};
			openGraphsArray.each((_, element) => {
				const property = $(element)
					.attr('property');
				const content = $(element).attr('content');
				if (!property.includes('twitter')) {
					openGraphs[property] = content;
				}
			});

			return openGraphs;
		};

		// Open graph social
		const fetchMetaSocial = (): Record<string, unknown> => {
			const openGraphsArray = head.find('meta[name]');
			const socials = {};

			openGraphsArray.each((_, element) => {
				const property = $(element).attr('name');
				const content = $(element).attr('content');

				if (property.includes('twitter')) {
					socials[property] = content;
				}
			});
			return socials;
		};

		// Favicons
		const fetchFavicons = (): string[] => {
			const faviconArray = head.find('link[rel]');
			const favicons: string[] = [];

			faviconArray.each((_, element) => {
				const href = $(element).attr('href');

				if (href.includes('shortcut icon') || href.includes('icon') || href.includes('apple-touch-startup-image') || href.includes('apple-touch-icon')) {
					const validUri = createValidUri(response.url, href);
					favicons.push(validUri);
				}
			});
			return favicons;
		};

		// Meta-data
		const basicMetaData = basicMeta();
		const openGraphs = fetchMeta();
		const openGraph_social = fetchMetaSocial();
		const favicons = fetchFavicons();

		const metaData: Record<string, unknown> = {
			basic_metadata: basicMetaData,
			opengraph: openGraphs,
			opengraph_social: openGraph_social,
			favicons
		};

		return metaData;
	} catch (error) {
		console.error(error);
	}
};

// Options interface
interface Options{
	userAgent?: string;
	fromEmail?: string;
}
