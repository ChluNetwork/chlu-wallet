import { ratingColor, blue, mainColor, backgroundColorDark, borderColorDark, lightTextColor } from 'context/palette'

export default {
  submitBtnStyle: {
    root: {
      backgroundColor: ratingColor,
      labelColor: 'rgb(255, 255, 255)'
    }
  },
  switchPaymentBtnStyle: {
    backgroundColor: lightTextColor,
    labelColor: 'rgb(255, 255, 255)'
  },
  avatarStyle: {
    color: blue,
    backgroundColor: backgroundColorDark,
    style: { border: `1px solid ${borderColorDark}` }
  },
  checkboxIconStyle: {
    root: {
      fill: mainColor
    },
    active: {
      fill: blue
    }
  },
  textFieldsStyle: {
    root: {
      underlineFocusStyle: { borderColor: mainColor },
      floatingLabelStyle: { color: blue }
    }
  },
  VendorAddressInputStyle: { paddingRight: '45px' },
  ratingStyle:{ starColor: ratingColor }
}
