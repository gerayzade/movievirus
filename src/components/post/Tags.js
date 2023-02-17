import PropTypes from 'prop-types'
import { slugify } from '~/utils'
import Link from '~/components/ui/Link'

const Tags = ({ filterUrl, tags }) => {
  return (
    <ul className="tags">
      {tags.map((tag, i) => {
        const tagUrl = `${filterUrl}?tags=${slugify(tag)}`
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
