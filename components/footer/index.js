const Footer = () => (
  <footer className="footer">
    <div className="row">
      <span className="col-lg-30 col-md-60 col-sm-60">
        All Rights Reserved (c) {new Date().getFullYear()}
      </span>
      <span className="col-lg-30 col-md-60 col-sm-60">
        <a href="https://gerayzade.az/" target="_blank" data-cursor="dot">
          {'</'} Developed by <em>Gerayzade</em> {'>'}
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;