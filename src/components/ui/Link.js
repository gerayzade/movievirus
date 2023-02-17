import NextLink from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const Link = ({
  as: asPath,
  children,
  href,
  ...rest
}) => {
  const router = useRouter()
  const isCurrentPath = router.asPath == (asPath || href)
  return (/^https:\/\//).test(href)
    ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
    : isCurrentPath
      ? (
        <span {...rest}>
          {children}
        </span>
      )
      : (
        <NextLink
          as={asPath}
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
