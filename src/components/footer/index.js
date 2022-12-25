import Link from '~/components/ui/Link'

const Footer = () => (
  <footer className="footer">
    <div className="row">
      <div className="col-lg-30 col-md-60 col-sm-60">
        <span>All Rights Reserved (c) 2020-{new Date().getFullYear()}</span>
      </div>
      <div className="col-lg-30 col-md-60 col-sm-60">
        <Link
          href="https://gerayzade.az/"
          data-cursor="small-red-dot"
        >
          {'</'} Developed by <em>Gerayzade</em> {'>'}
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer
