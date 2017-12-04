import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  productInfoWrapper: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  productInfoTitle: {
    fontWeight: 'bold',
    color: Colors.darkGray,
    fontSize: 16
  },
  productInfoPrice: {
    color: Colors.darkGray,
    fontSize: 16,
    marginTop: 5
  },
  productInfoImageWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  productInfoImage: {
    height: 300,
    width: null
  },
  radioFormWrapper: {
    backgroundColor: Colors.snow,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderBottomWidth: 0,
    borderRadius: 3
  },
  radioFormTitle: {
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginTop: 20,
    fontSize: 18
  },
  radioButton: {
    alignSelf: 'flex-start'
  },
  radioButtonOuter: {
    marginLeft: 10
  },
  radioButtonWrapper: {
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  radioButtonLabel: {
    fontSize: 20,
    marginTop: 5,
    color: Colors.darkGray
  },
  continueButtonWrapper: {
    marginTop: 30
  },
  continueButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.darkOrange
  },
  continueButtonText: {
    color: Colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent'
  }
})
