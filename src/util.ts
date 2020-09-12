'use strict';
/**
 * Checks if a favicon path is proper uri if not append the path to the host
 * @param host | website host
 * @param path | favicon relative path
 */
export const createValidUri = (host: string, path: string): string => {
	if (path.includes(host)) {
		return path;
	}

	const updatedPath = path.replace('/', '');
	return `${host}${updatedPath}`;
};
