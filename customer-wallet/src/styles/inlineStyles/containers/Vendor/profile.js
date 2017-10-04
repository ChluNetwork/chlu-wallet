import { ratingColor, borderColorDark, mainColor } from 'context/palette'

export default {
  ratingStyle: { starColor: ratingColor },
  searchIconStyle: {
    iconStyle: {
      fill: borderColorDark,
      cursor: 'pointer',
      width: '100%',
      height: '100%'
    },
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 0,
      width: '25px',
      height: '25px'
    }
  },
  searchInputStyle: {
    style: { height: '35px' },
    inputStyle: { padding: '0 25px 10px 0' },
    underlineFocusStyle: { borderColor: mainColor },
    autoFocus: true
  }
}
