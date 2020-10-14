import test from 'ava';
import {createValidUri} from '../src/util';

test('creates valid URI', t => {
	const result: string = createValidUri('https://github.com/', '/rocktimsaikia');
	t.is(result, 'https://github.com/rocktimsaikia');
});

test('returns the path', t => {
	const result: string = createValidUri('https://github.com/', 'https://github.com/rocktimsaikia');
	t.is(result, 'https://github.com/rocktimsaikia');
});
