import { ratingColor, blue, mainColor, backgroundColorDark, borderColorDark } from 'context/palette'

export default {
  submitBtnStyle: {
    backgroundColor: ratingColor,
    labelColor: 'rgb(255, 255, 255)'
  },
  avatarStyle: {
    color: blue,
    backgroundColor: backgroundColorDark,
    style: { border: `1px solid ${borderColorDark}` }
  },
  getCheckboxStyle: isActive => ({
    iconStyle: { fill: isActive ? blue : mainColor }
  }),
  textFieldsStyle: {
    fullWidth: true,
    underlineFocusStyle: { borderColor: mainColor },
    floatingLabelStyle: { color: blue }
  },
  VendorAddressInputStyle: { paddingRight: '45px' },
  ratingStyle:{ starColor: ratingColor }
}
