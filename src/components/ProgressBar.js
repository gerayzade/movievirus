import nprogress from 'nprogress'
import { useRouter } from 'next/router'
import {
  Fragment,
  useEffect,
} from 'react'

const ProgressBar = () => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', nprogress.start)
    router.events.on('routeChangeComplete', nprogress.done)
    router.events.on('routeChangeError', nprogress.done)

    return () => {
      router.events.off('routeChangeStart', nprogress.start)
      router.events.off('routeChangeComplete', nprogress.done)
      router.events.off('routeChangeError', nprogress.done)
    }
  }, [router])

  return <Fragment />
}

export default ProgressBar
