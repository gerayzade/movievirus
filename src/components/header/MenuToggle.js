import cn from 'classnames'
import { useCallback } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { setMenuState } from '~/store/actions'
import { selectMenuState } from '~/store/selectors'

const MenuToggle = () => {
  const isMenuOpened = useSelector(selectMenuState)
  const dispatch = useDispatch()

  const handleClick = useCallback((e) => {
    dispatch(setMenuState(!isMenuOpened))
  }, [dispatch, isMenuOpened])
  return (
    <button
      type="button"
      className={cn('burger', {
        'active': isMenuOpened,
      })}
      aria-label="Menu"
      data-cursor="large-red-dot"
      onClick={handleClick}
    >
      <div className="burger__icon">
        <span className="burger__line"></span> 
        <span className="burger__line"></span>    
      </div>  
    </button>
  )
}

export default MenuToggle
