module.exports = {
  plugins: [
    ['@fullhuman/postcss-purgecss', {
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['html', 'body'],
    }],
  ],
}
