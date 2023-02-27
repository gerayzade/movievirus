import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '~/store'
import ProgressBar from '~/components/ProgressBar';

import '~/styles/index.scss'

const VirusApp = ({ Component, router, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Fragment>
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
