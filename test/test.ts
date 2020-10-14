import test from 'ava';
import fetchMetaData from '../src';

test('check meta-data', async t => {
	const response = await fetchMetaData('https://google.com');

	t.true(Object.prototype.hasOwnProperty.call(response, 'basic_metadata'));
	t.true(Object.prototype.hasOwnProperty.call(response, 'opengraph'));
	t.true(Object.prototype.hasOwnProperty.call(response, 'opengraph_social'));
	t.true(Object.prototype.hasOwnProperty.call(response, 'favicons'));
});
