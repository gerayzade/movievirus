import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { PageTransition } from 'next-page-transitions'
import { wrapper } from '~/store'
import 'styles/index.scss'

const VirusApp = ({ Component, router: { route }, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Fragment>
      <Provider store={store}>
        <PageTransition
          classNames="page-transition"
          timeout={500}
        >
          <Component
            key={route}
            {...props.pageProps}
          />
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
          background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000 50%, #000 100%);
          transform: translateY(100vh);
          will-change: transform;
        }
        .page-transition-enter .page-transition {
          transform: translateY(-100vh);
        }
        .page-transition-enter-active .page-transition {
          transform: translateY(100vh);
          transition: transform .7s;
        }
        .page-transition-exit .page-transition {
          transform: translateY(100vh);
        }
        .page-transition-exit-active .page-transition {
          transform: translateY(-100vh);
          transition: transform .7s;
        }
      `}
      </style>
    </Fragment>
  )
}

export default VirusApp
