module.exports = {
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-rational-order'
	],
	plugins: [
		'stylelint-order'
	],
	rules: {
		'font-family-no-missing-generic-family-keyword': null,
		'font-family-name-quotes': 'always-unless-keyword',
		'color-function-notation': 'legacy',
		'selector-class-pattern': '([a-z]+([A-Z][a-z0-9]+)*)',
		'selector-id-pattern': '([a-z]+([A-Z][a-z0-9]+)*)',
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind'
				]
			}
		]
	}
};
