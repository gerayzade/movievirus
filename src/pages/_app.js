import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '~/store'
import GoogleAnalytics from '~/components/GoogleAnalytics'
import ProgressBar from '~/components/ProgressBar';

import '~/styles/index.scss'

const VirusApp = ({ Component, router, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Fragment>
      <GoogleAnalytics />
      <Provider store={store}>
        <ProgressBar />
        <Component
          key={router.asPath}
          {...props.pageProps}
        />
      </Provider>
    </Fragment>
  )
}

export default VirusApp
