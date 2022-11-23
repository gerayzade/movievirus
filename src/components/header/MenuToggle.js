import cn from 'classnames'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  menuStateUpdated,
  selectMenuState,
} from '~/store/layoutSlice'

const MenuToggle = () => {
  const isMenuOpened = useSelector(selectMenuState)
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      className={cn('burger', {
        'active': isMenuOpened,
      })}
      aria-label="Menu"
      data-cursor="dot-2"
      onClick={(e) => dispatch(menuStateUpdated(!isMenuOpened))}
    >
      <div className="burger__icon">
        <span className="burger__line"></span> 
        <span className="burger__line"></span>    
      </div>  
    </button>
  )
}

export default MenuToggle
