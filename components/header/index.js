import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
// import MenuToggle from './MenuToggle'

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
          <Link href="/" scroll={false}>
            <h1 className="logo" data-cursor="dot-2" onClick={(e) => handleLogoClick(e)}>
              <Image
                src="/images/logo.svg"
                alt="Movievirus"
                width={286}
                height={30}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </h1>
          </Link>
          <strong className="hashes">#StayHome #Quarantine&Chill</strong>
        </div>
        {/* <div className="col-lg-15 col-md-15 col-sm-15">
          <MenuToggle />
        </div> */}
      </div>
    </header>
  )
}

export default Header
