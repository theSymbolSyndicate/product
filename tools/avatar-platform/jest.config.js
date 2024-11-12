/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const fs = require('fs');
const path = require('path');
const nextJest = require('next/jest.js'); // eslint-disable-line import/extensions

// Map aliases from jsconfig.json to Jest moduleNameMapper
const mapPathsToModuleNameMapper = () => {
	const jsConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'jsconfig.json'), 'utf8'));
	const paths = jsConfig.compilerOptions.paths || {};

	const moduleNameMapper = Object.entries(paths).reduce((acc, [key, value]) => {
		const formattedKey = `^${key.replace('*', '(.*)')}$`;
		const formattedValue = path.join('<rootDir>', value[0].replace('*', '$1'));
		acc[formattedKey] = formattedValue;

		return acc;
	}, {});

	return moduleNameMapper;
};

const createJestConfig = nextJest({
	// Path to  Next.js app to load next.config.js and .env files in test environment
	dir: './'
});

const testIgnorePatterns = [
	'/node_modules/',
	'/cypress/',
	'/coverage/',
	'/dist/',
	'/build/',
	'/public/',
	'/test-utils/',
	'/*.config.{js,mj,cj}'
];

// Add any custom config to be passed to Jest
const customJestConfig = {
	workerThreads: true,
	testPathIgnorePatterns: testIgnorePatterns,
	coveragePathIgnorePatterns: testIgnorePatterns,
	clearMocks: true,
	coverageProvider: 'v8',
	moduleNameMapper: mapPathsToModuleNameMapper(),
	transform: {},
	resetMocks: true,
	restoreMocks: true,
	testEnvironment: 'jsdom',
	testTimeout: 2500,
	extensionsToTreatAsEsm: ['.jsx'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};

module.exports = createJestConfig(customJestConfig);
