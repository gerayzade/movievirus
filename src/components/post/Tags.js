import PropTypes from 'prop-types'
import { slugify } from '~/utils'
import Link from '~/components/ui/Link'

const Tags = ({ tags }) => {
  return (
    <ul className="tags">
      {tags.map((tag, i) => {
        const slug = slugify(tag)
        return (
          <li key={i}>
            <Link
              href="/tag/[slug]"
              as={`/tag/${slug}`}
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
}

export default Tags
