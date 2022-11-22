import { useEffect } from 'react'
import Head from 'next/head'
import Cursor from '~/components/cursor'
import Footer from '~/components/footer'
import Header from '~/components/header'
import {
  PreloadFonts,
  PreloadImages,
} from '~/components/header/ResourceLinks'

const Layout = ({ children, title }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="wrapper">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        {/* browser tab view */}
        <title>{title ? 'Movievirus ★ ' + title : 'MovieVirus'}</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon.png"
        /> 
        {/* preload assets */}
        <PreloadFonts />
        <PreloadImages />
      </Head>
      <Cursor />
      <div className="page-transition" />
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout