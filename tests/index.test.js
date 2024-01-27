import metaFetcher from '../dist/index.js';
import test from 'ava';

test('it should contain the meta-data properties', async (t) => {
	const response = await metaFetcher('https://rocktimsaikia.dev');
	t.is(response.metadata.website, 'https://rocktimsaikia.dev/');
	t.is(response.metadata.title, 'Rocktim – Software Engineer');
	t.is(
		response.metadata.description,
		'Fullstack software engineer and open-source enthusiast.'
	);
	t.is(response.metadata.banner, 'https://rocktimsaikia.com/images/rocktimcodes.png');
	t.is(response.metadata.themeColor, undefined);
});
