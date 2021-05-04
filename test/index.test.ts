import metaFetcher from '../src';

describe('Main', () => {
  it('it should contain the meta-data properties', async (done) => {
    const response = await metaFetcher('https://google.com');
    expect(response).toHaveProperty('metadata');
    expect(response).toHaveProperty('socials');
    expect(response).toHaveProperty('favicons');
    done();
  });
});
