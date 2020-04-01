const Footer = () => (
  <footer className="footer">
    <div className="row">
      <span className="col-desk-6 col-tab-12">
        All Rights Reserved (c) {new Date().getFullYear()}
      </span>
      <span className="col-desk-6 col-tab-12">
        <a href="https://gerayzade.az/" target="_blank">
          {'</'} Developed by <em>Gerayzade</em> {'>'}
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;