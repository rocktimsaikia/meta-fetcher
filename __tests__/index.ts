import {fetchMetaData} from '../src';

test('check meta-data', async () => {
	const response = await fetchMetaData('https://microtip.now.sh');
	const keys = Object.keys(response);

	expect(keys).toHaveLength(4);
	expect(response).toHaveProperty('basic_metadata');
	expect(response).toHaveProperty('opengraph');
	expect(response).toHaveProperty('opengraph_social');
	expect(response).toHaveProperty('favicons');
});
