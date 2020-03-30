export default class FactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      translateX: 0, 
      activeId: -1 
    };
  }
  handleMouseOver(e, id) {
    e.persist();
    let winWidth = window.innerWidth;
    this.setState(state => ({ 
      translateX: winWidth > 1024 ? -(e.pageX / winWidth * 50) : 0,
      activeId: id 
    }));
  }
  handleMouseLeave(e, clear = false) {
    this.setState(state => ({
      translateX: clear ? 0 : state.translateX, 
      activeId: -1
    }));
  }
  render() {
    let n = this.props.facts.length, count = 0;
    let rows = Math.floor(n/9) * 2 + Math.ceil((n - 9 * Math.floor(n/9)) / 5);
    let id = this.state.activeId;
    return(
      <div className="facts-strip" onMouseLeave={(e) => this.handleMouseLeave(e, true)}>
        {Array(rows).fill(0).map((row, i) => (
        <div className="row padded" style={{transform: `translateX(${this.state.translateX}px)`}} key={i}>
          {this.props.facts.slice(count, count += (i % 2 === 0 ? 5 : 4)).map(item => 
          <div className="col-eq-5 col-tab-6 col-mob-4" key={item.id}>
            <div className={'fact ' + (id === item.id ? 'active' : (id !== -1 ? 'muted' : ''))} 
              onMouseOver={(e) => this.handleMouseOver(e, item.id)} 
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