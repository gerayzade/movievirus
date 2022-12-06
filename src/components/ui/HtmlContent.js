import PropTypes from 'prop-types'
import { parseLineBreaks } from '~/utils'

const HtmlContent = ({
  content,
  tag: HtmlTag,
}) => {
  return (
    <HtmlTag dangerouslySetInnerHTML={{__html: parseLineBreaks(content)}} />
  )
}

HtmlContent.defaultProps = {
  tag: 'div',
}

HtmlContent.propTypes = {
  content: PropTypes.string.isRequired,
  tag: PropTypes.string,
}

export default HtmlContent
