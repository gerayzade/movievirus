import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '~/store'
import PageTransition from '~/components/PageTransition'

import '~/styles/index.scss'

const VirusApp = ({ Component, router, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Fragment>
      <Provider store={store}>
        <PageTransition>
          <Component
            key={router.asPath}
            {...props.pageProps}
          />
        </PageTransition>
      </Provider>
    </Fragment>
  )
}

export default VirusApp
