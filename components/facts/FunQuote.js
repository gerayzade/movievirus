const quotes = [
  'People say nothing is impossible,\nbut you do nothing right now',
  'When life gets blurry\nadjust your focus',
  'May the force be with you\n whatever that means',
  'The first draft of\neverything is shit',
  'Azdan az,\nçoktan çok gider'
];

const FunQuote = ({ i }) => (
  <div className="col-tab-6 hide-mob hide-desk">
    <div className="fun-quote">
      <h4><span dangerouslySetInnerHTML={{__html: quotes[i % quotes.length].replace(/\n/g, '<br/>')}} /></h4>
    </div>
  </div>
);

export default FunQuote;