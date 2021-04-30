const isValid = (path: string): boolean =>
  path.startsWith('http') || path.startsWith('https');

/**
 * Prefix the site host to the relative favicon paths
 * @param host | website host
 * @param path | favicon relative path
 */
const createValidUri = (host: string, path: string): string => {
  if (isValid(path)) return path;

  const updatedPath = path.replace('/', '');
  return `${host}${updatedPath}`;
};

export default createValidUri;
