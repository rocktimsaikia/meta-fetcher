import formatUri from '../src/format';

describe('Format URI', () => {
  it('should return an absolute url', () => {
    const url = formatUri('https://rocktimcodes.site/', '/about');
    expect(url).toEqual('https://rocktimcodes.site/about');
  });

  it('should return the original url if not reltive', () => {
    const url = formatUri('rocktimcodes', 'https://rocktimcodes.site/projects');
    expect(url).toEqual('https://rocktimcodes.site/projects');
  });
});
