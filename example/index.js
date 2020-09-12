const {fetchMetaData} = require('../dist');

(async () => {
	const result = await fetchMetaData('https://hoppscotch.io/', {
		userAgent: 'Rocktim',
		fromEmail: 'srocktim61@gmail.com'
	});
	console.log(result);
})();
