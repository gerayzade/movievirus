import PropTypes from 'prop-types'
import Link from '~/components/ui/Link'
import { slugify } from '~/utils'

const Tags = ({ data, filterUrl }) => {
  return (
    <ul className="tags">
      {data.map((tag, i) => {
        const tagUrl = `${filterUrl}?tag=${slugify(tag)}`
        return (
          <Link
            href={tagUrl}
            key={i}
          >
            <li data-cursor="transparent">
              {tag}
            </li>
          </Link>
        )
      })}
    </ul>
  )
}

Tags.defaultProps = {
  data: [],
}

Tags.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  filterUrl: PropTypes.string.isRequired,
}

export default Tags