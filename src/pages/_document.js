import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
export default class HtmlDocument extends Document {
  render() {
    return (
      <Html
        lang="en"
        dir="ltr"
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
