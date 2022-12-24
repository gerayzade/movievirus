import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '~/store'

import '~/styles/index.scss'

const VirusApp = ({ Component, router, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Fragment>
      <Provider store={store}>
        <Component
          key={router.asPath}
          {...props.pageProps}
        />
      </Provider>
    </Fragment>
  )
}

export default VirusApp
