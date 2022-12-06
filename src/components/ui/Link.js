import PropTypes from 'prop-types'
import NextLink from 'next/link'

const Link = ({
  children,
  href,
  ...rest
}) => {
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
