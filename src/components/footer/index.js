import Link from '~/components/ui/Link'

const Footer = () => (
  <footer className="footer">
    <div className="row">
      <span className="col-lg-30 col-md-60 col-sm-60">
        All Rights Reserved (c) {new Date().getFullYear()}
      </span>
      <span className="col-lg-30 col-md-60 col-sm-60">
        <Link
          href="https://gerayzade.az/"
          data-cursor="dot"
        >
          {'</'} Developed by <em>Gerayzade</em> {'>'}
        </Link>
      </span>
    </div>
  </footer>
)

export default Footer
