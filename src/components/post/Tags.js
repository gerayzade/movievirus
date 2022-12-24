import PropTypes from 'prop-types'
import Link from '~/components/ui/Link'
import { slugify } from '~/utils'

const Tags = ({ filterUrl, tags }) => {
  return (
    <ul className="tags">
      {tags.map((tag, i) => {
        const tagUrl = `${filterUrl}?tag=${slugify(tag)}`
        return (
          <li key={i}>
            <Link
              href={tagUrl}
              data-cursor="transparent"
            >
              {tag}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

Tags.defaultProps = {
  tags: [],
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  filterUrl: PropTypes.string.isRequired,
}

export default Tags
