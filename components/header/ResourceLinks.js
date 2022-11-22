export const PreloadFonts = () => {
  const fonts = [
    {
      name: 'montserrat-v14-latin',
      weights: [300, 400, 500, 700],
    },
    {
      name: 'sen-v1-latin',
      weights: [700],
    },
  ]
  const fontDir = (name) => name.split('-')[0].replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
  const fontPath = (weight, name) => `/fonts/${fontDir(name)}/${name}-${weight}.woff2`

  return fonts
    .reduce((acc, font) => [...acc, ...font.weights.map(weight => fontPath(weight, font.name))], [])
    .map(fontUrl => (
      <link
        key={fontUrl}
        rel="preload"
        href={fontUrl}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    ))
}

export const PreloadImages = () => {
  return [
    '/images/logo.svg',
    '/images/noise.jpg',
  ].map(imageUrl => (
    <link
      key={imageUrl}
      rel="preload"
      href={imageUrl}
      as="image"
    />
  ))
}
