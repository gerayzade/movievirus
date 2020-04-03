import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { PageTransition } from 'next-page-transitions';
import { reduxStore } from '~/store';
import '~/assets/scss/style.scss';

const VirusApp = ({ Component, pageProps, router, store }) => (
  <>
    <Provider store={store}>
      <PageTransition timeout={350} classNames="page-transition">
        <Component {...pageProps} key={router.route} />
      </PageTransition>
    </Provider>
    <style jsx global>{`
      .page-transition {
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        width: 100%;
        height: 200vh;
        transform: translateY(100vh);
        background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000 50%, #000 100%);
        will-change: transform;
      }
      .page-transition-enter .page-transition,
      .page-transition-exit-active .page-transition {
        transform: translateY(-100vh);
        transition: transform .7s;
      }
      .page-transition-enter-done .page-transition,
      .page-transition-enter-active .page-transition,
      .page-transition-exit .page-transition {
        transition: transform .7s;
      }
      `}
    </style>
  </>
)


export default withRedux(reduxStore)(VirusApp);