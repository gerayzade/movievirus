import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const GoogleFonts = 'Montserrat:300,400,500,700|Sen:700,800';

const Layout = props => (
  <div className="wrapper">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title ? 'MovieVirus ★ ' + props.title : 'MovieVirus'}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link href={`https://fonts.googleapis.com/css?family=${GoogleFonts}&display=swap`} rel="stylesheet" />
    </Head>
    <Header />
    <main className="content">
      {props.children}
    </main>
    <Footer />
  </div>
);

export default Layout;