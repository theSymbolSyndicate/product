/* eslint no-underscore-dangle: 0 */
/* eslint import/no-anonymous-default-export: 0 */
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

const otherConfigs = fixupConfigRules(compat.extends(
	'../../_symbol/linters/javascript/default.eslintrc',
	'eslint-config-next',
	'plugin:import/react',
	'plugin:tailwindcss/recommended'
));

export default [
	...otherConfigs,
	{
		files: ['**/*.js', '**/*.mjs', '**/*.jsx']
	},
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/out/**', '**/build/**', '**/.next/**']
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		settings: {
			'import/resolver': {
				jsconfig: {
					config: 'jsconfig.json'
				}
			}
		},

		rules: {
			'import/extensions': ['error', 'always', {
				json: 'always',
				js: 'never',
				jsx: 'never'
			}]
		}
	}
];
