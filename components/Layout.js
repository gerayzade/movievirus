import Head from 'next/head';
import { PreloadFonts, PreloadImages } from './header/ResourceLinks';
import Header from './header';
import Footer from './footer';
import Cursor from './cursor';

const Layout = ({ children, title }) => (
  <div className="wrapper">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* browser tab content */}
      <title>{title ? 'Movievirus ★ ' + title : 'MovieVirus'}</title>
      <link rel="icon" type="image/png" href="/favicon.png" /> 
      {/* preload content */}
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
);

export default Layout;