import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import LazyLoad from '~/components/LazyLoad'
import Quote from './Quote'

const FactStrip = ({ facts }) => {
  // use state to animate rows with facts
  const initialState = useMemo(() => ({
    active: [-1, -1],
    x: 0,
  }), [])
  const [state, setState] = useState(initialState)
  const [mouseEvents, setMouseEvents] = useState(true)
  // destructuring state
  const { active, x } = state
  const [activeRow, activeCol] = active
  // handle scroll
  const timeout = useRef(null)
  useEffect(() => {
    const onScroll = () => { 
      setState(initialState)
      setMouseEvents(false)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => { 
        setMouseEvents(true)
      }, 400)
    }
    window.addEventListener('scroll', onScroll)
    // clean effect
    return () => {
      clearTimeout(timeout.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [initialState])
  // handle transformations on mouse enter/leave events
  const handleMouseEnter = (e, row, col) => {
    e.persist()
    if (!mouseEvents || (active[0] === row && active[1] === col)) return
    let vw = window.innerWidth
    let pos = e.pageX / vw
    let xLookup = { 0: 30, 1: 15, 2: 0, 3: 15, 4: 30, 5: 22.5, 6: 7.5, 7: 7.5, 8: 22.5 }
    let x = vw > 1024 ? (pos > 0.5 ? -1 : 1) * xLookup[col % 9] : 0
    setState({ active: [row, col], x: x })
  }
  const handleMouseLeave = (e) => setState(initialState)
  // generate alternating rows with 5 and 4 facts
  let n = facts.length, count = 0
  let rows = Array(Math.floor(n/9) * 2 + Math.ceil((n - 9 * Math.floor(n/9)) / 5)).fill(0)
  // update rows' style
  const getRowStyles = (i) => ({
    transform: `translateX(${x !== 0 ? x * (1 + ((i % 3) * 0.4)) : 0}px)`, 
    zIndex: i === activeRow ? 2 : 1,
  })
  return(
    <LazyLoad data={facts}>
      <div className="facts-strip row">
        {rows.map((_, i) => (
        <div
          className="row padded"
          style={getRowStyles(i)}
          key={i}
        >
          {facts.slice(count, count += (i % 2 === 0 ? 5 : 4)).map(item => 
          <div
            className="col-lg-12 col-md-30 col-sm-60"
            key={item.i}
          >
            <Link
              href="/post/[slug]"
              as={`/post/${item.slug}`}
              scroll={false}
            >
              <div
                className={'fact ' + (activeCol === item.i ? 'active' : (activeCol !== -1 ? 'muted' : ''))}
                data-cursor="dot"
                onMouseEnter={(e) => handleMouseEnter(e, i, item.i)} 
                onMouseMove={(e) => handleMouseEnter(e, i, item.i)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              >
                <div
                  className="image lazy"
                  data-src={item.image}
                  role="img"
                  aria-label={item.title}
                />
                <div className="layer">
                  <h4>
                    <span className="highlight">
                      {item.title}
                    </span>
                  </h4>
                </div>
              </div>
            </Link>
          </div>
          )}
          {i % 2 === 0 && <Quote i={Math.floor(i/2)} />}
        </div>
        ))}
      </div>
    </LazyLoad>
  )
}

export default FactStrip
