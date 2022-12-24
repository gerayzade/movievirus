import PropTypes from 'prop-types'
import icons from '~/utils/icons'

const SvgIcon = ({ name }) => {
  const {
    content,
    height,
    width,
  } = icons[name]
  return (
    <svg
      dangerouslySetInnerHTML={{__html: content}}
      viewBox={`0 0 ${width} ${height}`}
    />
  )
}

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default SvgIcon
