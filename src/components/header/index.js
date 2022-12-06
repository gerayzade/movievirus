import { useRouter } from 'next/router'
import Link from '~/components/ui/Link'
import MenuToggle from '~/components/header/MenuToggle'

const Header = () => {
  const router = useRouter()
  const handleLogoClick = (e) => {
    if (router.pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }
  return (
    <header className="header">
      <div className="row">
        <div className="col-lg-45 col-md-45 col-sm-45">
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
          <strong className="hashes">
            #StayHome #Quarantine&Chill
          </strong>
        </div>
        <div className="col-lg-15 col-md-15 col-sm-15">
          <MenuToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
