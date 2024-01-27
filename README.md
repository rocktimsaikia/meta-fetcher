# meta-fetcher

[![CI](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml/badge.svg)](https://github.com/rocktimsaikia/meta-fetcher/actions/workflows/main.yml)
![npm](https://img.shields.io/npm/v/meta-fetcher?style=flat&color=success&logo=npm)

Simple metadata scrapper.

## Installation

```sh
yarn add meta-fetcher
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
  "title": "Hoppscotch - Open source API development ecosystem",
  "description": "Helps you create requests faster, saving precious time on development.",
  "image": "https://hoppscotch.io/og.png",
  "url": "https://hoppscotch.io/",
  "siteName": "Hoppscotch",
  "type": "website"
}
```

## API

### metaFetcher(input)

Takes one url string as a parameter and returns an object containing the meta-information.

#### input

type: `string` \
default: `'none'`

The url string to be scrapped.

## Related

[**page-scrapper**](https://github.com/rocktimsaikia/page-scrapper): Node.js scrapper that pulls out all links and images of a given site.

## License

2024 [MIT](https://choosealicense.com/licenses/mit/) © [Rocktim Saikia](https://rocktimsaikia.dev)
