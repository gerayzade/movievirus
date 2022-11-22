import {
  Fragment,
  useEffect,
} from 'react'
import Blazy from 'blazy'

const LazyLoad = ({ children, data }) => {
  useEffect(() => {
    new Blazy({
      offset: 250,
      selector: '.image',
      successClass: 'lazy-loaded',
      errorClass: 'lazy-failed',
    })
  }, [data])
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default LazyLoad
