const fs = require('fs');
const withSass = require('@zeit/next-sass');

const getPathsForPosts = () => 
	fs.readdirSync('./content/facts').reduce((acc, filename) => {
		const slug = filename.substring(0, filename.length - 3)
		return { ...acc, [`/post/${slug}`]: { page: '/post/[slug]', query: { slug: slug, } } }
	}, {});
  
module.exports = withSass({
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader'
		})
		return config;
	},
	exportPathMap: async () => {
		return {
			'/': { page: '/' },
			...getPathsForPosts()
		};
  }
});