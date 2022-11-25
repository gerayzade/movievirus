import { parseLineBreaks } from '~/utils'

const HtmlContent = ({
  content,
  tag: HtmlTag,
}) => {
  return (
    <HtmlTag dangerouslySetInnerHTML={{__html: parseLineBreaks(content)}} />
  )
}

export default HtmlContent
