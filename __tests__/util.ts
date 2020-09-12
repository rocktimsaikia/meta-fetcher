import {createValidUri} from '../src/util';

describe('URI validation', () => {
	test('creates valid URI', () => {
		const result: string = createValidUri('https://github.com/', '/rocktimsaikia');
		expect(result).toBe('https://github.com/rocktimsaikia');
	});

	test('returns the path', () => {
		const result: string = createValidUri('https://github.com/', 'https://github.com/rocktimsaikia');
		expect(result).toBe('https://github.com/rocktimsaikia');
	});
});
