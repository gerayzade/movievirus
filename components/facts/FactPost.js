import Blazy from 'blazy';
import { TINIEST_GIF_IMAGE } from '~/lib/constants';

const FactPost = ({ post }) => {
  // init lazy-load for images
  React.useEffect(() => {new Blazy();}, [post]);
  return(
    <div className="row padded">
      <div className="col-lg-60 col-md-60 col-sm-60">
        <div className="post">
          <div className="img-holder">
            <img className="b-lazy" src={TINIEST_GIF_IMAGE} data-src={post.image} alt={post.title} />
          </div>
          <h2><span className="highlight">{post.title}</span></h2>
          <p dangerouslySetInnerHTML={{__html: post.description.replace(/\n/g, '<br/>')}} />
        </div>
      </div>
    </div>
  )
}

export default FactPost;