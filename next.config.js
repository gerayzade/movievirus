const withSass = require('@zeit/next-sass');
module.exports = withSass({
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: {
				mode: ['react-component']
			}
		})
		return config;
	}
});