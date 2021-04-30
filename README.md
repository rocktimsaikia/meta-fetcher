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
