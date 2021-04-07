# meta-fetcher :mag_right:

> Tiny URL meta-data fetcher that scraps the meta-data of a given `URL` string.

![Travis (.com) branch](https://img.shields.io/travis/com/rocktimsaikia/meta-fetcher/master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Under the hood it uses [node-fetch](https://github.com/node-fetch/node-fetch) to fetch the metadata, parses it and returns it as json object.

## Install

```sh
npm install meta-fetcher
```

## Basic Usage

```js
const fetchMetaData = require("meta-fetcher");

(async () => {
	const result = await fetchMetaData("https://hoppscotch.io/");
	console.log(result);

	/*
        {
        basic_metadata: {
            website: 'https://hoppscotch.io/',
            title: 'Hoppscotch • A free, fast and beautiful API request builder',
            description: 'A free, fast and beautiful API request builder'
        },
        opengraph: {
            'og:image': 'https://hoppscotch.io/banner.jpg',
            'og:type': 'website',
            'og:title': 'Hoppscotch',
            'og:site_name': 'Hoppscotch',
            'og:description': 'A free, fast and beautiful API request builder',
            'og:url': 'https://hoppscotch.io/'
        },
        opengraph_social: {
            'twitter:card': 'summary_large_image',
            'twitter:site': '@liyasthomas',
            'twitter:creator': '@liyasthomas'
        },
        favicons: [
            'https://hoppscotch.io/icon.png',
            'https://hoppscotch.io/icon.png',
            'https://hoppscotch.io/_nuxt/icons/icon_64x64.9834b3.png'
        ]
        }
    */
})();
```

## Advanced Usage (with options)

You can optionally set the `userAgent` and `fromEmail` options in request `Header` while fetching the meta-data.

```js
const fetchMetaData = require("meta-fetcher");

(async () => {
	const result = await fetchMetaData("https://hoppscotch.io/", {
		userAgent: "Rocktim",
		fromEmail: "srocktim61@gmail.com",
	});
	console.log(result);
})();
```

<br>

It can also fetch meta-data from `shortened-url` .For example:

```js
const fetchMetaData = require("meta-fetcher");

(async () => {
	const result = await fetchMetaData("https://bit.ly/2Fj9sNF");
	console.log(result);
})();
```

## Options

You can set these options in Header while fetching the data if needed.

| Option      | Required |         Default Value |
| :---------- | :------: | --------------------: |
| `userAgent` |    No    |        `meta-fetcher` |
| `fromEMail` |    No    | `metafetch@email.com` |

## Support

You can support me and my work right here :

<a href="https://www.buymeacoffee.com/7BdaxfI"><img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" height="40px"/></a>

## Related

- [page-scrapper](https://github.com/rocktimsaikia/page-scrapper) - A simple node.js scrapper that pulls out all the links and images of a given site.

## License

MIT &copy; [Rocktim Saikia](https://rocktimsaikia.now.sh)
