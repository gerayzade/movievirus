import PropTypes from 'prop-types'
import { QUOTES } from '~/utils/constants'
import HtmlContent from '~/components/ui/HtmlContent'

const Quote = ({ index }) => {
  return (
    <div className="col-md-30 hide-sm hide-lg">
      <div className="fun-quote">
        <h2>
          <HtmlContent
            content={QUOTES[index % QUOTES.length]}
            tag="span"
          />
        </h2>
      </div>
    </div>
  )
}

Quote.propTypes = {
  index: PropTypes.number.isRequired,
}

export default Quote
