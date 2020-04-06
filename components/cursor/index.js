import CursorDot from './plugin';
import { COLOR_PALETTE } from '~/lib/constants';

const Cursor = () => {
  React.useEffect(() => {
    // init cursor when mounted
    const cursor = CursorDot({
      zIndex: 100,
      diameter: 10,
      background: COLOR_PALETTE.RED,
      borderColor: COLOR_PALETTE.RED,
      borderWidth: 2
    });
    cursor.over('[data-cursor="dot"]', {
      scale: 3,
      background: 'transparent',
      borderColor: COLOR_PALETTE.WHITE
    });
    cursor.over('[data-cursor="dot-2"]', {
      scale: 6,
      borderColor: 'transparent',
      mixBlendMode: 'lighten'
    });
    cursor.over('[data-cursor="dot-3"]', {
      borderColor: 'transparent',
      background: 'transparent',
    });
  }, []);
  return (<></>);
}

export default Cursor;