import Head from 'next/head';
import { PreloadFonts, PreloadImages } from './header/ResourceLinks';
import Header from './header';
import Footer from './footer';
import Cursor from './cursor';

const Layout = ({ children, title }) => {
  // scroll to top when component unmounted
 // React.useEffect(() => {setTimeout(() => window.scrollTo(0,0), 700)}, []); 
  return (
    <div className="wrapper">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* browser tab view */}
        <title>{title ? 'Movievirus ★ ' + title : 'MovieVirus'}</title>
        <link rel="icon" type="image/png" href="/favicon.png" /> 
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
  );
}

export default Layout;