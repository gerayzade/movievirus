const quotes = [
  'People say nothing is impossible,\nbut you do nothing right now',
  'When life gets blurry\nadjust your focus',
  'May the force be with you\n whatever that means',
  'The first draft of\neverything is shit',
  'Azdan az,\nçoktan çok gider',
]

const FunQuote = ({ index }) => (
  <div className="col-md-30 hide-sm hide-lg">
    <div className="fun-quote">
      <h4>
        <span dangerouslySetInnerHTML={{__html: quotes[index % quotes.length].replace(/\n/g, '<br/>')}} />
      </h4>
    </div>
  </div>
)

export default FunQuote
