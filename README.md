# meta-fetcher

[![CI](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml/badge.svg)](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml)
![npm](https://badgen.net/npm/v/meta-fetcher)

Scrape metadata from a website URL

## Features

- Never fetches the full page - stops downloading as soon as `<head>` is received
- Uses native `fetch`; cheerio is the only dependency
- Follows redirects and reports the final url
- Resolves relative favicon paths to absolute urls
- Ships TypeScript types, works with both ESM and CJS

## Installation

Requires Node.js 18 or later. Ships with TypeScript types.

```sh
npm install meta-fetcher
```

## Usage

Pass the url string to scrape. Resolves with an object containing `metadata` (website, title, description, banner, themeColor), `socials` (twitter meta tags), and `favicons` (resolved icon urls).

```js
import metaFetcher from 'meta-fetcher';

const result = await metaFetcher('https://rocktim.dev');

console.log(result);
```

Output:

```json
{
  "metadata": {
    "website": "https://rocktim.dev/",
    "title": "Rocktim Saikia",
    "description": "Rocktim Saikia - Senior Full-Stack Engineer. Indie builder of APIs, CLIs and dev tools.",
    "banner": "https://rocktim.dev/og.png",
    "themeColor": "#fdfdf8"
  },
  "socials": {
    "twitter:site": "@rocktimsaikia",
    "twitter:creator": "@rocktimsaikia"
  },
  "favicons": [
    "https://rocktim.dev/apple-touch-icon.png"
  ]
}
```

## Related

[**page-scrapper**](https://github.com/rocktimsaikia/page-scrapper): Scrape all links and images from a web page.

## License

MIT 2020-2026 &copy; [Rocktim Saikia](https://rocktim.dev)
