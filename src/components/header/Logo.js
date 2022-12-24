import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setMenuState } from '~/store/actions'
import Link from '~/components/ui/Link'

const Logo = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogoClick = (e) => {
    dispatch(setMenuState(false))
    if (router.pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }
  return (
    <Link href="/">
      <h1
        className="logo"
        data-cursor="large-red-dot"
        onClick={(e) => handleLogoClick(e)}
      >
        <picture>
          <img
            src="/images/logo.svg"
            alt="Movievirus"
          />
        </picture>
      </h1>
    </Link>
  )
}

export default Logo
