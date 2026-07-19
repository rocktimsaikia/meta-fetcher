# meta-fetcher

[![CI](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml/badge.svg)](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml)
![npm](https://img.shields.io/npm/v/meta-fetcher?style=flat&color=success&logo=npm)

Simple metadata scraper for Node.js.

## Installation

```sh
npm install meta-fetcher
```

## Usage

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

## API

### metaFetcher(input)

Takes a url string and returns an object with `metadata` (website, title, description, banner, themeColor), `socials` (twitter meta tags), and `favicons` (resolved icon urls).

#### input

type: `string`

The url to scrape.

## Related

[**page-scrapper**](https://github.com/rocktimsaikia/page-scrapper): Node.js scrapper that pulls out all links and images of a given site.

## License

2026 [MIT](./LICENSE) © [Rocktim Saikia](https://rocktim.dev)
