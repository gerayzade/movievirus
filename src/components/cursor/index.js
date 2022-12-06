import {
  Fragment,
  useEffect,
} from 'react'
import CursorDot from '~/components/cursor/plugin'
import { COLOR_PALETTE } from '~/utils/mappings'

const Cursor = () => {
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
  }, [])
  return (<Fragment />)
}

export default Cursor
