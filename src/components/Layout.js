import Head from 'next/head'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  BASE_URL,
  DESCRIPTION,
} from '~/utils/constants'
import Cursor from '~/components/cursor'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Menu from  '~/components/menu'
import {
  PreloadFonts,
  PreloadImages,
} from '~/components/ResourceLinks'

const Layout = ({ children, description, title }) => {
  const { asPath } = useRouter()
  const canonical = `${BASE_URL}${asPath.split(/[?#]/)[0]}`
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="wrapper">
      <Head>
        <title>{`MovieVirus${title ? ` - ${title}` : ''}`}</title>
        <meta
          name="description"
          content={description}
        />
        {BASE_URL && (
          <link
            rel="canonical"
            href={canonical}
          />
        )}
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
  description: DESCRIPTION,
  title: null,
}

Layout.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}

export default Layout
