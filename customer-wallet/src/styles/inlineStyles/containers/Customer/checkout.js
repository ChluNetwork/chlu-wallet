import { orange, lightBorderOrange, lightOrange, mainTextColor, borderColor, darkOrange } from 'context/palette'

export default {
  buttonStyle: {
    root: {
      border: `1px solid ${lightBorderOrange}`,
      background: `linear-gradient(to bottom, ${lightOrange}, ${orange})`
    },
  },
  buttonLabelStyle: {
    textTransform: 'none',
    fontWeight: 'bold',
    color: mainTextColor,
  },
  radioButtonStyle: {
    style: { padding: '20px' },
    iconStyle: { fill: borderColor }
  },
  ratingStyle: { starColor: darkOrange }
}