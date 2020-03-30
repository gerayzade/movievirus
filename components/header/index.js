import Logo from '~/assets/icons/logo.svg';
import MenuToggle from './MenuToggle';

const Header = () => (
  <header className="header">
    <div className="row">
      <div className="col-desk-8">
        <Logo className="logo" />
        <strong className="slogan">The most viral facts from film industry</strong>
      </div>
      <div className="col-desk-4">
        <MenuToggle />
      </div>
    </div>
  </header>
);

export default Header;