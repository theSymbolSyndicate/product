const path = require('path');

module.exports = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	reloadOnPrerender: true,
	localePath: path.resolve('./public/locales')
};
