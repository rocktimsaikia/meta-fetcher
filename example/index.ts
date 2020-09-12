// Example script using url-fetch
'use strict';
import {fetchMetaData} from '../src';

(async () => {
	const result = await fetchMetaData('https://microtip.now.sh', {
		userAgent: 'Rocktim',
		fromEmail: 'srocktim61@gmail.com'
	});
	console.log(result);
})();
