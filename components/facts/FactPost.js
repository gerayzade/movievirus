import Blazy from 'blazy';

const FactPost = ({ post }) => {
  // init lazy-load for images
  React.useEffect(() => {new Blazy();}, [post]);
  return(
    <div className="row padded">
      <div className="col-lg-60 col-md-60 col-sm-60">
        <div className="post">
          <div className="image b-lazy" data-src={'https://movievirus.net' + post.image} role="img" aria-label={post.title} />
          <h2><span className="highlight">{post.title}</span></h2>
          <p dangerouslySetInnerHTML={{__html: post.description.replace(/\n/g, '<br/>')}} />
        </div>
      </div>
    </div>
  )
}

export default FactPost;