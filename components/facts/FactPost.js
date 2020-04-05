import LazyLoad from '~/components/LazyLoad';

const FactPost = ({ post }) => (
  <LazyLoad dependencies={[post]}>
    <div className="row">
      <div className="col-lg-60 col-md-60 col-sm-60">
        <div className="post">
          <div className="image lazy" data-src={post.image} role="img" aria-label={post.title} />
          <h2><span className="highlight">{post.title}</span></h2>
          <p dangerouslySetInnerHTML={{__html: post.description.replace(/\n/g, '<br/>')}} />
        </div>
      </div>
    </div>
  </LazyLoad>
)

export default FactPost;