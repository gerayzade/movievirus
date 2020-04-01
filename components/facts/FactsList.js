export default class FactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: [-1, -1], x: 0 };
  }
  handleMouseOver(e, row, id) {
    e.persist();
    let vw = window.innerWidth;
    let pos = e.pageX / vw;
    let x = vw > 1024 ? (pos > 0.5 ? -1 : 1) * ((pos < 0.5 ? (0.5 + pos) : pos) * 25) : 0;
    this.setState(state => ({  x: x, active: [row, id] }));
  }
  handleMouseLeave(e) {
    this.setState(state => ({ x: 0, active: [-1, -1] }));
  }
  render() {
    let n = this.props.facts.length, count = 0;
    let rows = Math.floor(n/9) * 2 + Math.ceil((n - 9 * Math.floor(n/9)) / 5);
    const { active, x } = this.state;
    const getRowStyles = (i) => ({
      transform: `translateX(${x !== 0 ? x * (1 + ((i % 2) * 0.2)) : 0}px)`, 
      zIndex: i === active[0] ? 2 : 1
    });
    return(
      <div className="facts-strip row padded">
        {Array(rows).fill(0).map((row, i) => (
        <div className="row padded" style={getRowStyles(i)} key={i}>
          {this.props.facts.slice(count, count += (i % 2 === 0 ? 5 : 4)).map(item => 
          <div className="col-eq-5 col-tab-6 col-mob-4" key={item.id}>
            <div className={'fact ' + (active[1] === item.id ? 'active' : (active[1] !== -1 ? 'muted' : ''))} 
              onMouseOver={(e) => this.handleMouseOver(e, i, item.id)} 
              onMouseLeave={(e) => this.handleMouseLeave(e)}
            >
              <img src={item.image} alt={item.title} />
              <div className="layer">
                <p>
                  <span>{item.title}</span>
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
        ))}
      </div>
    )
  }
}