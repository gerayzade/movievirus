import {
  Fragment,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'
import { selectSearchQuery } from '~/store/selectors'
import { COLOR_PALETTE } from '~/utils/mappings'
import CursorDot from '~/components/cursor/plugin'

const Cursor = () => {
  // Use search query to update cursor type over dynamically changing search results
  const searchQuery = useSelector(selectSearchQuery)

  useEffect(() => {
    const cursor = CursorDot({
      zIndex: 100,
      diameter: 10,
      background: COLOR_PALETTE.RED,
      borderColor: COLOR_PALETTE.RED,
      borderWidth: 2,
    })
    cursor.over('[data-cursor="small-red-dot"]', {
      scale: 3,
      borderColor: 'transparent',
      mixBlendMode: 'lighten',
    })
    cursor.over('[data-cursor="large-red-dot"]', {
      scale: 6,
      borderColor: 'transparent',
      mixBlendMode: 'lighten',
    })
    cursor.over('[data-cursor="white-outline"]', {
      scale: 3,
      background: 'transparent',
      borderColor: COLOR_PALETTE.WHITE,
    })
    cursor.over('[data-cursor="transparent"]', {
      borderColor: 'transparent',
      background: 'transparent',
    })
  }, [searchQuery])
  return (<Fragment />)
}

export default Cursor
