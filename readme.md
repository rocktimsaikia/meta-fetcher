# meta-fetcher

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/rocktimsaikia/meta-fetcher/CI/main?style=flat-square&logo=github&color=success)
![npm](https://img.shields.io/npm/v/meta-fetcher?style=flat-square&color=success&logo=npm)

Simple metadata scrapper for node.js. Under the hood it uses [isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch) \
to fetch the metadata, parses it and returns it as json object.

<br/>

### Installation

```bash
npm install meta-fetcher
```

or use `yarn`

```bash
yarn add meta-fetcher
```

<br/>

### Usage

```javascript
import metaFetcher from 'meta-fetcher';

(async () => {
  const result = await metaFetcher('https://hoppscotch.io/');
  console.log(result);

  /*
        {
            metadata: {
                website: 'https://hoppscotch.io/',
                title: 'Hoppscotch - Open source API development ecosystem',
                description: 'Helps you create requests faster, saving precious time on development.',
                banner: 'https://hoppscotch.io/banner.jpg',
                themeColor: '#202124'
            },
            socials: {
                'twitter:site': '@hoppscotch_io',
                'twitter:creator': '@hoppscotch_io'
            },
            favicons: [
                'https://hoppscotch.io/_nuxt/icons/icon_64x64.9834b3.png',
                'https://hoppscotch.io/_nuxt/icons/icon_512x512.9834b3.png'
            ]
        }
    */
})();
```

<br/>

### API

#### metaFetcher(input)

Takes one url string as a parameter and returns an object containing the meta-information.

##### input

type: `string` \
default: `'none'`

The url string to be scrapped.

<br/>

### Related

Here are some related projects

- [**page-scrapper**](https://github.com/rocktimsaikia/page-scrapper): 📦 node.js scrapper that pulls out all links and images of a given site.

<br/>

### License

[MIT](https://choosealicense.com/licenses/mit/)
