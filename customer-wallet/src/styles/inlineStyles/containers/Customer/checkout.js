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
    root: { padding: '20px' },
  },
  radioButtonIconStyle: {
    root: {
      fill: borderColor
    }
  },
  ratingStyle: { starColor: darkOrange }
}