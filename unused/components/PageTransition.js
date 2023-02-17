import { PageTransition as NextPageTransition } from 'next-page-transitions'
import { Fragment } from 'react'
import { COLOR_PALETTE } from '~/utils/mappings'

const PageTransition = ({ children }) => {
  return (
    <Fragment>
      <NextPageTransition
        classNames="page-transition"
        timeout={500}
      >
        {children}
      </NextPageTransition>
      <style jsx global>{`
        .page-transition {
          position: fixed;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100%;
          height: 200vh;
          background-image: linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            ${COLOR_PALETTE.BLACK} 50%, ${COLOR_PALETTE.BLACK} 100%
          );
          transform: translateY(100vh);
        }
        .page-transition-enter .page-transition {
          transform: translateY(-100vh);
        }
        .page-transition-enter-active .page-transition {
          transform: translateY(100vh);
          transition: transform .7s;
        }
        .page-transition-exit .page-transition {
          transform: translateY(100vh);
        }
        .page-transition-exit-active .page-transition {
          transform: translateY(-100vh);
          transition: transform .7s;
        }
      `}
      </style>
    </Fragment>
  )
}

export default PageTransition
