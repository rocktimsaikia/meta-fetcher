import metaFetcher from '../src';

describe('Main', () => {
  it('it should contain the meta-data properties', async (done) => {
    const response = await metaFetcher('https://google.com');
    expect(response).toHaveProperty('basic_metadata');
    expect(response).toHaveProperty('opengraph_social');
    expect(response).toHaveProperty('opengraph');
    expect(response).toHaveProperty('favicons');
    done();
  });
});
