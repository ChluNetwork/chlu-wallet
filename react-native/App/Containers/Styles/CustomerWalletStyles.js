import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerTitle: {
    color: Colors.mediumGray,
    fontWeight: 'bold'
  },
  priceWrapper: {
    marginTop: 15
  },
  priceUsd: {
    fontSize: 24,
    color: Colors.darkGray
  },
  priceBtc: {
    fontSize: 14,
    color: Colors.darkGray
  },
  paymentForm: {
    marginTop: 15,
    paddingTop: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DD'
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
  paymentFormWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DD',
    paddingHorizontal: 15,
    paddingBottom: 30
  },
  paymentFormAddressWrapper: {
    position: 'relative'
  },
  userAddressAvatar: {
    position: 'absolute',
    right: 5,
    bottom: 7,
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9ea0a9',
    backgroundColor: '#d6d7dd',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userAddressAvatarText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3051e2'
  },
  mt30: {
    marginTop: 30
  },
  mt20: {
    marginTop: 20
  },
  formPaymentsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  formPaymentWrapper: {
    paddingHorizontal: 5,
    alignItems: 'center',
    height: 70,
    width: 60,
    borderRadius: 3,
    justifyContent: 'center'
  },
  formPaymentAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  formPaymentAmountEqually: {
    marginHorizontal: 20,
    fontSize: 18
  },
  formPaymentReviewWrapper: {
    marginTop: 20,
    paddingHorizontal: 15
  },
  formPaymentReviewPadding: {
    paddingHorizontal: 15
  },
  formPaymentReviewRating: {
    width: '50%',
    marginTop: 30
  },
  formPaymentSubmitWrapper: {
    marginHorizontal: 20,
    marginTop: 30
  },
  formPaymentSubmitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0044',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2
  },
  formPaymentSubmitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})
