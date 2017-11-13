import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  headerTitle: {
    color: Colors.mediumGray,
    fontWeight: 'bold'
  },
  priceWrapper: {
    marginTop: 15
  },
  priceUsd: {
    fontSize: 20,
    color: Colors.darkGray
  },
  priceBtc: {
    fontSize: 14,
    color: Colors.darkGray
  },
  paymentForm: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  headerWrapper: {
    paddingHorizontal: 15
  },
  inputLabel: {
    color: Colors.mediumGray
  },
  inputField: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    color: Colors.darkGray,
    fontSize: 16,
    paddingHorizontal: 0,
    paddingVertical: 5,
    flexGrow: 1
  },
})
