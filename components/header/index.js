import Link from 'next/link';
import MenuToggle from './MenuToggle';

const Header = () => (
  <header className="header">
    <div className="row">
      <div className="col-lg-45 col-md-45 col-sm-45">
        <Link href="/" scroll={false}>
          <h1><img className="logo" src={require('~/assets/svg/logo.svg')} alt="Movievirus" /></h1>
        </Link>
        <strong className="hashes">#StayHome #Quarantine&Chill</strong>
      </div>
      <div className="col-lg-15 col-md-15 col-sm-15">
        <MenuToggle />
      </div>
    </div>
  </header>
);

export default Header;