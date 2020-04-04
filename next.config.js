const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withSass = require('@zeit/next-sass');
const withPurgeSass = require('next-purgecss')
  
module.exports = withPlugins([
		[optimizedImages, {
			imagesFolder: 'img',
			optimizeImagesInDev: true,
			svgo: {},
			mozjpeg: { quality: 80 },
			optipng: { optimizationLevel: 3 },
		}],
		withSass,
		withPurgeSass
	],{
		webpack: (config, { isServer }) => {
			if(!isServer) {
				config.node = {
					fs: 'empty'
				}
			}
			return config;
		}
	}
);