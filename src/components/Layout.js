import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Head from 'next/head'
import Cursor from '~/components/cursor'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Menu from  '~/components/menu'
import {
  PreloadFonts,
  PreloadImages,
} from '~/components/ResourceLinks'

const Layout = ({ children, title }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="wrapper">
      <Head>
        <title>{`MovieVirus${title ? ` ★ ${title}` : ''}`}</title>
        {/* preload assets */}
        <PreloadFonts />
        <PreloadImages />
      </Head>
      <Cursor />
      <div className="page-transition" />
      <Header />
      <Menu />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: null,
}

Layout.propTypes = {
  title: PropTypes.string,
}

export default Layout
