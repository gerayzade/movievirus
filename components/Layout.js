import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, title, fonts = 'Montserrat:300,400,500,700|Sen:700' }) => (
  <div className="wrapper">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? 'Movievirus ★ ' + title : 'MovieVirus'}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="stylesheet"href={`https://fonts.googleapis.com/css?family=${fonts}&display=swap`} />
      <link rel="preload" as="image" href={require('~/assets/img/noise.jpg')} />
    </Head>
    <div className="page-transition" />
    <Header />
    <main className="content">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;