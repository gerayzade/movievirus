import Logo from '~/components/header/Logo'
import MenuToggle from '~/components/header/MenuToggle'

const Header = () => {
  return (
    <header className="header">
      <div className="row">
        <div className="col-lg-45 col-md-45 col-sm-45">
          <Logo />
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
