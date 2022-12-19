import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Link = ({
  children,
  href,
  ...rest
}) => {
  const router = useRouter()
  const isExternalUrl = (/^https:\/\//).test(href)
  const isSamePath = router.asPath === href

  if (isExternalUrl) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }

  return isSamePath 
    ? (
      <span {...rest}>
        {children}
      </span>
    )
    : (
      <NextLink
        href={href}
        scroll={false}
        {...rest}
      >
        {children}
      </NextLink>
    )
}

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired,
}

export default Link
