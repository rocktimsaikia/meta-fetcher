import http from 'node:http';
import metaFetcher from '../dist/index.js';
import test from 'ava';

const html = `<!doctype html>
<html>
<head>
	<title>Test Site</title>
	<meta name="description" content="A test description." />
	<meta property="og:image" content="https://example.com/og.png" />
	<meta name="theme-color" content="#ff0000" />
	<meta property="twitter:site" content="@testsite" />
	<meta property="twitter:card" content="summary" />
	<link rel="icon" href="/favicon.ico" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="preload" href="/assets/codicon.ttf" />
</head>
<body></body>
</html>`;

let server;
let baseUrl;

test.before(async () => {
	server = http.createServer((req, res) => {
		res.setHeader('content-type', 'text/html');
		if (req.url === '/endless') {
			// Send the head, then keep the connection open without ever ending
			// the body. metaFetcher must resolve anyway.
			res.write(html.replace('</html>', '<body>'));
			return;
		}
		res.end(html);
	});
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
	baseUrl = `http://127.0.0.1:${server.address().port}/`;
});

test.after.always(() => {
	server.closeAllConnections();
	server.close();
});

test('it should contain the meta-data properties', async (t) => {
	const response = await metaFetcher(baseUrl);
	t.is(response.metadata.website, baseUrl);
	t.is(response.metadata.title, 'Test Site');
	t.is(response.metadata.description, 'A test description.');
	t.is(response.metadata.banner, 'https://example.com/og.png');
	t.is(response.metadata.themeColor, '#ff0000');
	t.deepEqual(response.socials, { 'twitter:site': '@testsite' });
	t.deepEqual(response.favicons, [
		`${baseUrl}favicon.ico`,
		`${baseUrl}apple-touch-icon.png`,
	]);
});

test('it should resolve without downloading the full body', async (t) => {
	const response = await metaFetcher(`${baseUrl}endless`);
	t.is(response.metadata.title, 'Test Site');
});
