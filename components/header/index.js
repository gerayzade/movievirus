import Link from 'next/link';
import Logo from '~/assets/svg/logo.svg?sprite';
import MenuToggle from './MenuToggle';

const Header = () => (
  <header className="header">
    <div className="row">
      <div className="col-desk-8">
        <Link href="/" scroll={false}>
          <h1><Logo className="logo" /></h1>
        </Link>
        <strong className="hashes">#StayHome #Quarantine&Chill</strong>
      </div>
      <div className="col-desk-4">
        <MenuToggle />
      </div>
    </div>
  </header>
);

export default Header;