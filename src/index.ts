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
    const desc = head.find('meta[name=description]').attr('content');

    return {
      website,
      title,
      description: desc,
    };
  };

  // Open graph basic
  const fetchMeta = () => {
    const openGraphsArray = head.find('meta[property]');
    const openGraphs: Record<string, string | undefined> = {};
    openGraphsArray.each((_, element) => {
      const property = $(element).attr('property');
      const content = $(element).attr('content');
      if (property?.includes('twitter')) {
        openGraphs[property] = content;
      }
    });

    return openGraphs;
  };

  // Open graph social
  const fetchMetaSocial = () => {
    const openGraphsArray = head.find('meta[name]');
    const socials: Record<string, string | undefined> = {};

    openGraphsArray.each((_, element) => {
      const property = $(element).attr('name');
      const content = $(element).attr('content');

      if (property?.includes('twitter')) {
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
  const basicMetaData = basicMeta();
  const openGraphs = fetchMeta();
  const openGraph_social = fetchMetaSocial();
  const favicons = fetchFavicons();

  const metaData = {
    basic_metadata: basicMetaData,
    opengraph: openGraphs,
    opengraph_social: openGraph_social,
    favicons,
  };

  return metaData;
};

export default metaFetcher;
