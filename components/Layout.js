import Head from 'next/head';
import Header from '~/components/header';
import Footer from '~/components/footer';
import Cursor from '~/components/cursor';
import { GOOGLE_FONTS } from '~/lib/constants';

const Layout = ({ children, title }) => (
  <div className="wrapper">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? 'Movievirus ★ ' + title : 'MovieVirus'}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="stylesheet"href={`https://fonts.googleapis.com/css?family=${GOOGLE_FONTS}&display=swap`} />
      <link rel="preload" as="image" href={require('~/assets/svg/logo.svg')} />
      <link rel="preload" as="image" href={require('~/assets/img/noise.jpg')} />
    </Head>
    <Cursor />
    <div className="page-transition" />
    <div className="screen-flow row hide-md hide-sm" />
    <Header />
    <main className="content">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;