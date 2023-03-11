import Head from 'next/head'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { SLOGAN } from '~/utils/constants'
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
        <meta
          name="description"
          content={SLOGAN}
        />
        {/* preload assets */}
        <PreloadFonts />
        <PreloadImages />
      </Head>
      <Cursor />
      <Header />
      <Menu />
      <main>
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
