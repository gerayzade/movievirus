import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { COLOR_PALETTE } from '~/utils/mappings'
export default class HtmlDocument extends Document {
  render() {
    return (
      <Html
        lang="en"
        dir="ltr"
      >
        <Head>
          <meta
            name="msapplication-TileColor"
            content={COLOR_PALETTE.BLACK}
          />
          <meta
            name="theme-color"
            content={COLOR_PALETTE.BLACK}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon.png"
          />
          <link
            rel="manifest"
            href="/site.webmanifest"
          />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color={COLOR_PALETTE.BLACK}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
