import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { PageTransition } from 'next-page-transitions';
import { reduxStore } from '~/store';
import '~/assets/scss/style.scss';

const VirusApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} />
      </PageTransition>
    </Provider>
  )
}

VirusApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default withRedux(reduxStore)(VirusApp);