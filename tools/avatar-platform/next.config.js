const i18nConfig = require('./next-i18next.config');
const webpack = require('webpack');

module.exports = {
	output: 'standalone',
	basePath: process.env.NEXT_PUBLIC_SUBDIRECTORY,
	assetPrefix: process.env.NEXT_PUBLIC_SUBDIRECTORY,
	reactStrictMode: false,
	experimental: {
		scrollRestoration: true,
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	i18n: i18nConfig.i18n,
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack: config => {
		// use a browser-optimized wasm for Ed25519 crypto operations
		config.plugins.push(new webpack.NormalModuleReplacementPlugin(
			/symbol-crypto-wasm-node/,
			'../../../symbol-crypto-wasm-web/symbol_crypto_wasm.js'
		));

		// enable async loading of wasm files
		config.experiments = { asyncWebAssembly: true, topLevelAwait: true, layers: true };

		return config;
	}
};
