export default class FactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: [-1, -1], x: 0 };
  }
  handleMouseOver(e, row, id) {
    e.persist();
    let x = window.innerWidth > 1024 ? -(e.pageX / window.innerWidth * 50) : 0;
    this.setState(state => ({  x: x, active: [row, id] }));
  }
  handleMouseLeave(e, clear = false) {
    this.setState(state => ({ x: clear ? 0 : state.x, active: [-1, -1] }));
  }
  render() {
    let n = this.props.facts.length, count = 0;
    let rows = Math.floor(n/9) * 2 + Math.ceil((n - 9 * Math.floor(n/9)) / 5);
    let { active, x } = this.state;
    return(
      <div className="facts-strip row padded" onMouseLeave={(e) => this.handleMouseLeave(e, true)}>
        {Array(rows).fill(0).map((row, i) => (
        <div className="row padded" style={{transform: `translateX(${x}px)`, zIndex: i === active[0] ? 2 : 1 }} key={i}>
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