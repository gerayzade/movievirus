import { parseLineBreaks } from '~/utils'
import { QUOTES } from '~/utils/constants'

const FunQuote = ({ index }) => {
  const quote = QUOTES[index % QUOTES.length]
  return (
    <div className="col-md-30 hide-sm hide-lg">
      <div className="fun-quote">
        <h4>
          <span dangerouslySetInnerHTML={{__html: parseLineBreaks(quote)}} />
        </h4>
      </div>
    </div>
  )
}

export default FunQuote
