import { blue, mainColor, ratingColor } from 'context/palette'

const textFieldsStyle = {
  fullWidth: true,
  underlineFocusStyle: { borderColor: mainColor },
  floatingLabelStyle: { color: blue }
}

const buttonStyle = {
  backgroundColor: ratingColor,
  labelColor: 'rgb(255, 255, 255)',
  style: { margin: '10px 0' }
}

export { textFieldsStyle, buttonStyle }
