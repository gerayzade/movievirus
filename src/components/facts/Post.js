import Link from '~/components/ui/Link'
import LazyLoad from '~/components/LazyLoad'
import { parseLineBreaks } from '~/utils'

const Post = ({ post }) => (
  <LazyLoad data={post}>
    <div className="row">
      <div className="col-lg-60 col-md-60 col-sm-60">
        <div className="post">
          <div
            className="image lazy"
            aria-label={post.title}
            data-src={post.image}
            role="img"
          />
          <div className="data">
            <h4>{'20 Mar, 2020'}</h4>
            <h2>
              <span className="highlight">
                {post.title}
              </span>
            </h2>
            <p dangerouslySetInnerHTML={{__html: parseLineBreaks(post.description)}} />
            <h4>Tags</h4>
            <ul className="tags">
              {post.tags.map((tag, i) => (
                <Link
                  href="/"
                  key={i}
                >
                  <li data-cursor="dot-3">
                    {tag}
                  </li>
                </Link>
              ))}
            </ul>
            <h4>Source</h4>
            <Link
              href={post.source}
              data-cursor="dot"
            >
              <span>{post.source.split('/').slice(0,3).join('/') + '/'}</span>
              <span>{post.source.split('/').slice(3).join('/')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </LazyLoad>
)

export default Post
