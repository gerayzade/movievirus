import NextProgress from 'next-progress';
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { wrapper } from '~/store'
import { COLOR_PALETTE } from '~/utils/mappings'

import '~/styles/index.scss'

const VirusApp = ({ Component, router, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Fragment>
      <Provider store={store}>
        <NextProgress
          color={COLOR_PALETTE.RED}
          height={3}
          options={{ showSpinner: false }}
        />
        <Component
          key={router.asPath}
          {...props.pageProps}
        />
      </Provider>
    </Fragment>
  )
}

export default VirusApp
