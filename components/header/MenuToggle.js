export default class MenuToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    const btnClassList = 'burger' + (this.state.isToggleOn ? ' active' : '');
    return (
      <button type="button" aria-label="Menu" className={btnClassList} onClick={() => this.handleClick()}>
        <div className="burger__icon">
          <span className="burger__line"></span> 
          <span className="burger__line"></span>    
        </div>  
      </button>
    );
  }
}