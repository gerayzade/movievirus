import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  selectMenuState,
  setMenuState,
} from '~/store/layoutSlice'

const MenuToggle = () => {
  const isMenuOpened = useSelector(selectMenuState)
  const dispatch = useDispatch()
  const onClick = (e) => dispatch(setMenuState(!isMenuOpened))
  return (
    <button
      type="button"
      className={'burger' + (isMenuOpened ? ' active' : '')}
      onClick={(e) => onClick(e)}
      aria-label="Menu"
      data-cursor="dot-2"
    >
      <div className="burger__icon">
        <span className="burger__line"></span> 
        <span className="burger__line"></span>    
      </div>  
    </button>
  )
}

export default MenuToggle
