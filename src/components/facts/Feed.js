import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import LazyLoad from '~/components/LazyLoad'
import Quote from '~/components/Quote'

const Feed = ({ facts }) => {
  // animate rows with facts
  const initialState = useMemo(() => ({
    active: [-1, -1],
    x: 0,
  }), [])
  const [state, setState] = useState(initialState)
  const [mouseEvents, setMouseEvents] = useState(true)
  const { active, x } = state
  const [activeRow, activeCol] = active
  // handle scroll
  const timeout = useRef()
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
    return () => {
      clearTimeout(timeout.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [initialState])
  // handle transformations on mouse enter/leave events
  const handleMouseEnter = (e, rowIndex, colIndex) => {
    e.persist()
    const isColActive = activeRow === rowIndex
      && activeCol === colIndex
    if (!mouseEvents || isColActive) return
    const vw = window.innerWidth
    const pos = e.pageX / vw
    const x = vw > 1024
      ? (pos > 0.5 ? -1 : 1) * [30, 15, 0, 15, 30, 22.5, 7.5, 7.5, 22.5][colIndex % 9]
      : 0
    setState({
      active: [rowIndex, colIndex],
      x,
    })
  }
  const handleMouseLeave = (e) => setState(initialState)
  // generate alternating rows with 5 and 4 facts
  let count = 0
  const n = facts.length
  const rows = Array(Math.floor(n / 9) * 2 + Math.ceil((n - 9 * Math.floor(n / 9)) / 5)).fill(0)
  const getRowStyles = (rowIndex) => ({
    transform: `translateX(${x !== 0 ? x * (1 + ((rowIndex % 3) * 0.4)) : 0}px)`, 
    zIndex: rowIndex === activeRow ? 2 : 1,
  })
  const getRowFacts = (rowIndex) => {
    return facts.slice(count, count += (rowIndex % 2 === 0 ? 5 : 4))
  }
  return(
    <LazyLoad data={facts}>
      <div className="facts-strip row">
        {rows.map((_, rowIndex) => (
          <div
            className="row padded"
            style={getRowStyles(rowIndex)}
            key={rowIndex}
          >
            {getRowFacts(rowIndex).map(item => (
              <div
                className="col-lg-12 col-md-30 col-sm-60"
                key={item.index}
              >
                <Link
                  href="/post/[slug]"
                  as={`/post/${item.slug}`}
                  scroll={false}
                >
                  <div
                    className={'fact ' + (activeCol === item.index ? 'active' : (activeCol !== -1 ? 'muted' : ''))}
                    data-cursor="dot"
                    onMouseEnter={(e) => handleMouseEnter(e, rowIndex, item.index)} 
                    onMouseMove={(e) => handleMouseEnter(e, rowIndex, item.index)}
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
            ))}
            {rowIndex % 2 === 0 && <Quote index={Math.floor(rowIndex / 2)} />}
          </div>
        ))}
      </div>
    </LazyLoad>
  )
}

export default Feed
