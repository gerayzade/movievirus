import { Fragment } from 'react'
import Script from 'next/script'
import { isDev } from '~/utils'
import { GA_MEASUREMENT_ID } from '~/utils/constants'

const GoogleAnalytics = () => {
  if (isDev() || !GA_MEASUREMENT_ID) return null
  return (
    <Fragment>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </Fragment>
  )
}

export default GoogleAnalytics
