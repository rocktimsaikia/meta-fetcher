# meta-fetcher

[![CI](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml/badge.svg)](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml)
![npm](https://badgen.net/npm/v/meta-fetcher)

Scrape metadata from a website URL

## Installation

Requires Node.js 18 or later. Ships with TypeScript types.

```sh
npm install meta-fetcher
```

## Usage

Pass the url string to scrape. Resolves with an object containing `metadata` (website, title, description, banner, themeColor), `socials` (twitter meta tags), and `favicons` (resolved icon urls).

```js
import metaFetcher from 'meta-fetcher';

const result = await metaFetcher('https://hoppscotch.io/');

console.log(result);
```

Output:

```json
{
  "metadata": {
    "website": "https://hoppscotch.io/",
    "title": "Hoppscotch • Open source API development ecosystem",
    "description": "Helps you create requests faster, saving precious time on development.",
    "banner": "https://hoppscotch.io/banner.png",
    "themeColor": "#181818"
  },
  "socials": {},
  "favicons": [
    "https://hoppscotch.io/favicon.ico",
    "https://hoppscotch.io/icon.png"
  ]
}
```

## Related

[**page-scrapper**](https://github.com/rocktimsaikia/page-scrapper): Scrape all links and images from a web page.

## License

MIT 2020-2026 &copy; [Rocktim Saikia](https://rocktim.dev)
