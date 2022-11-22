module.exports = {
  plugins: [
    ['@fullhuman/postcss-purgecss', {
      content: [
        './src/pages/**/*.{js,jsx}',
        './src/components/**/*.{js,jsx}',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['html', 'body'],
    }],
  ],
}
