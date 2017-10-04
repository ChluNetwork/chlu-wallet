import { orange, lightBorderOrange, lightOrange, mainTextColor, borderColor, darkOrange } from 'context/palette'

export default {
  buttonStyle: {
    style: { border: `1px solid ${lightBorderOrange}` },
    buttonStyle: { background: `linear-gradient(to bottom, ${lightOrange}, ${orange})` },
    labelStyle: {
      textTransform: 'none',
      fontWeight: 'bold',
      color: mainTextColor,
    }
  },
  radioButtonStyle: {
    style: { padding: '20px' },
    iconStyle: { fill: borderColor }
  },
  ratingStyle: { starColor: darkOrange }
}