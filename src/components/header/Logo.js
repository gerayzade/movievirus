import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setMenuState } from '~/store/actions'
import Link from '~/components/ui/Link'

const Logo = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = useCallback((e) => {
    dispatch(setMenuState(false))
    if (router.pathname === '/') {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }, 0)
    }
  }, [dispatch, router])
  return (
    <Link href="/">
      <h1
        className="logo"
        data-cursor="large-red-dot"
        onClick={(e) => handleClick(e)}
      >
        <picture>
          <img
            src="/images/logo.svg"
            alt="Movievirus"
            width={286}
            height={30}
          />
        </picture>
      </h1>
    </Link>
  )
}

export default Logo
