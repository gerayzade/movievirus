// import Link from 'next/link'
import LazyLoad from '~/components/LazyLoad'

const FactPost = ({ post }) => (
  <LazyLoad data={post}>
    <div className="row">
      <div className="col-lg-60 col-md-60 col-sm-60">
        <div className="post">
          <div
            className="image lazy"
            data-src={post.image}
            role="img"
            aria-label={post.title}
          />
          <div className="data">
            <h4>{'20 Mar, 2020'}</h4>
            <h2>
              <span className="highlight">
                {post.title}
              </span>
            </h2>
            <p dangerouslySetInnerHTML={{__html: post.description.replace(/\n/g, '<br/>')}} />
            {/* <h4>Tags</h4>
            <ul className="tags">
              {post.tags.map((tag, i) => (
                <Link
                  href="/"
                  scroll={false}
                  key={i}
                >
                  <li data-cursor="dot-3">
                    {tag}
                  </li>
                </Link>
              ))}
            </ul> */}
            <h4>Source</h4>
            <a
              href={post.source}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="dot"
            >
              <span>{post.source.split('/').slice(0,3).join('/') + '/'}</span>
              <span>{post.source.split('/').slice(3).join('/')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </LazyLoad>
)

export default FactPost
