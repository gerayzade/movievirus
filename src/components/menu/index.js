import cn from 'classnames'
import {
  useEffect,
  useRef,
} from 'react'
import { useSelector } from 'react-redux'
import { selectMenuState } from '~/store/selectors'
import Search from '~/components/search'

const Menu = () => {
  const isMenuOpened = useSelector(selectMenuState)

  const menuContentRef = useRef(null)
  const scrollOffset = useRef(0)

  useEffect(() => {
    // Keep scroll position while menu is opened
    if (isMenuOpened) {
      menuContentRef.current.scrollTop = 0
      scrollOffset.current = window.pageYOffset
      document.body.style.setProperty('top', `-${scrollOffset.current}px`)
      document.body.classList.add('disable-scroll', 'menu-active')
    } else {
      document.body.style.removeProperty('top')
      document.body.classList.remove('disable-scroll', 'menu-active')
      window.scrollTo(0, scrollOffset.current)
    }
  }, [isMenuOpened])
  return (
    <aside className={cn('menu', {
      'active': isMenuOpened,
    })}>
      <div
        ref={menuContentRef}
        className="content"
      >
        <div className="row">
          <div className="col-lg-60 col-md-60 col-sm-60">
            <Search />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Menu
