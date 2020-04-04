import { getPostPaths, getPostBySlug } from '~/lib/content';
import Layout from '~/components/Layout';
import Blazy from 'blazy';

const Post = ({ post }) => {
  // init lazy-load for images
  React.useEffect(() => {new Blazy();}, [post]);
  return(
    <Layout title={post.title}>
      <div className="row padded">
        <div className="col-lg-60 col-md-60 col-sm-60">
          <div className="post">
            <div className="img-holder">
              <img className="b-lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
                data-src={post.image} alt={post.title} />
            </div>
            <h2><span className="highlight">{post.title}</span></h2>
            <p dangerouslySetInnerHTML={{__html: post.description.replace(/\n/g, '<br/>')}} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug('facts', params.slug);
  return { props: { post } };
}

export const getStaticPaths = () => {
  return getPostPaths('facts', '/post', true);
}

export default Post;