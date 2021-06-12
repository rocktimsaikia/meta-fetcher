import metaFetcher from '../src';

describe('Main', () => {
  it('it should contain the meta-data properties', async (done) => {
    const response = await metaFetcher('https://rocktimcodes.site');
    expect(response).toHaveProperty('metadata');
    expect(response).toHaveProperty('socials');
    expect(response).toHaveProperty('favicons');
    expect(response.metadata?.banner).toEqual(
      'https://rocktimcodes.site/images/rocktimcodes.png'
    );
    done();
  });
});
