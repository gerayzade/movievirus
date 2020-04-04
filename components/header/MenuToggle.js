import { connect } from 'react-redux';
import { toggleMenu } from '~/store/actions';

const MenuToggle = ({ dispatch, menuOpened }) => {
  return (
    <button type="button" aria-label="Menu" className={'burger' + (menuOpened ? ' active' : '')} 
      onClick={() => dispatch(toggleMenu(!menuOpened))} data-cursor="dot-2"
    >
      <div className="burger__icon">
        <span className="burger__line"></span> 
        <span className="burger__line"></span>    
      </div>  
    </button>
  );
}

export default connect(state => ({ 
  menuOpened: state.menuOpened 
}))(MenuToggle);