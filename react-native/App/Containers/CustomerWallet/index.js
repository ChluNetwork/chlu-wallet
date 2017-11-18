import React, { Component } from 'react'
// rn-components
import { View, Text, StatusBar, TextInput, ScrollView } from 'react-native'
// other components
import Address from './components/Address'
import PaymentHeader from './components/PaymentHeader'
import PaymentCurrency from './components/PaymentCurrency'
import SubmitButton from './components/SubmitButton'
import DrawerButton from '../../Components/DrawerButton'
import CheckBox from 'react-native-check-box'
import StarRating from 'react-native-star-rating'
import Icon from 'react-native-vector-icons/Foundation'
// styles
import styles from '../Styles/CustomerWalletStyles'

class CustomerWallet extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton action={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Customer Wallet'
  })

  state = {
    formValues: {
      address: '',
      btc: '',
      usd: '',
      review: false,
      reviewText: '',
      starCount: 0
    }
  }

  handleInputChange = (name) => (text) => {
    this.setState(({ formValues }) => ({
      formValues: {
        ...formValues,
        [name]: text
      }
    }))
  }

  handleCheckboxChange = () => {
    this.setState(({ formValues }) => ({
      formValues: {
        ...formValues,
        review: !formValues.review
      }
    }))
  }

  handleSubmit = () => {
    console.log('submit')
  }

  render () {
    const { formValues } = this.state
    const payments = [
      { name: 'BTC', icon: 'bitcoin-circle', active: true },
      { name: 'LTC', icon: 'bitcoin-circle' },
      { name: 'ZCash', icon: 'bitcoin-circle' },
      { name: 'BCC', icon: 'bitcoin-circle' }
    ]
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <StatusBar
            barStyle='light-content'
          />
          <PaymentHeader />
          <View style={styles.paymentForm}>
            <View style={styles.paymentFormWrapper}>
              <Address
                value={formValues.address}
                handleInputChange={this.handleInputChange}
              />
              <View style={styles.mt30}>
                <Text style={styles.inputLabel}>Payment currency</Text>
                <View style={styles.formPaymentsWrapper}>
                  {payments.map(({ name, icon, active }, idx) => (
                    <View
                      key={idx}
                      style={[styles.formPaymentWrapper, { backgroundColor: active ? '#EFF0F5' : '#fff' }]}>
                      <Icon name={icon} size={28} color={active ? '#3051E2' : '#6F717F'} />
                      <Text style={{ color: active ? '#3051E2' : '#6F717F', fontWeight: 'bold' }}>{name}</Text>
                    </View>
                  ))}
                </View>
                <PaymentCurrency
                  handleInputChange={this.handleInputChange}
                  usdValue={formValues.usd}
                  btcValue={formValues.btc}
                />
              </View>
            </View>

            <View style={styles.formPaymentReviewWrapper}>
              <CheckBox
                onClick={this.handleCheckboxChange}
                isChecked={formValues.review}
                checkBoxColor={'#3051E2'}
                rightText={'Write a review now'}
              />
            </View>
            {formValues.review &&
              <View style={styles.formPaymentReviewPadding}>
                <View style={styles.formPaymentReviewRating}>
                  <StarRating
                    disabled={false}
                    fullStar={'ios-star'}
                    emptyStar={'ios-star'}
                    iconSet={'Ionicons'}
                    starColor={'#ff004a'}
                    maxStars={5}
                    rating={formValues.starCount}
                    selectedStar={this.handleInputChange('starCount')}
                  />
                </View>
                <View style={styles.mt30}>
                  <Text style={styles.inputLabel}>Comment</Text>
                  <TextInput
                    style={styles.inputField}
                    value={formValues.reviewText}
                    autoCorrect={false}
                    onChangeText={this.handleInputChange('reviewText')}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Write your comment here'}
                    multiline
                  />
                </View>
              </View>}
          </View>
          <SubmitButton handleSubmit={this.handleSubmit} />
        </View>
      </ScrollView>
    )
  }
}

export default CustomerWallet
