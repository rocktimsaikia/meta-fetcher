import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';
import formatUri from './format';

type Metadata = Record<string, string[] | Record<string, string | undefined>>;

/**
 *  Fetches meta data of a given website url
 * @param url | the website url to fetch the metadata from
 */
const metaFetcher = async (url: string): Promise<Metadata | undefined> => {
  const urlString: string = url.trim();

  const response = await fetch(urlString);
  const content = await response.text();

  // Load html to cheerio
  const $ = cheerio.load(content);
  const head = $('head');

  // Basic site meta-data
  const basicMeta = () => {
    const website = response.url;
    const title = head.find('title').text();
    const description = head.find('meta[name=description]').attr('content');
    const banner = head.find('meta[name="og:image"]').attr('content');
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

      if (
        href?.includes('shortcut icon') ||
        href?.includes('icon') ||
        href?.includes('apple-touch-startup-image') ||
        href?.includes('apple-touch-icon')
      ) {
        const validUri = formatUri(response.url, href);
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
};

export default metaFetcher;
