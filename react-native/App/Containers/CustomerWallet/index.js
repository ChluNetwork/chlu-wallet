import React, { Component } from 'react'
// rn-components
import { View, Text, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native'
// other components
import DrawerButton from '../../Components/DrawerButton'
import CheckBox from 'react-native-check-box'
import StarRating from 'react-native-star-rating'
import Icon from 'react-native-vector-icons/Foundation'
// styles
import layoutStyles from '../Styles/LayoutStyles'
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
      starCount: 3
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
        <View style={layoutStyles.mainWrapper}>
          <StatusBar
            barStyle='light-content'
          />
          <View style={styles.headerWrapper}>
            <Text style={styles.headerTitle}>Payment for Shinny New Toy</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.priceUsd}>$ 400</Text>
              <Text style={styles.priceBtc}>0.0621 BTC</Text>
            </View>
          </View>
          <View style={styles.paymentForm}>
            <View style={styles.paymentFormWrapper}>
              <View style={styles.paymentFormAddressWrapper}>
                <Text style={styles.inputLabel}>Write address here</Text>
                <TextInput
                  style={styles.inputField}
                  value={formValues.address}
                  autoCorrect={false}
                  onChangeText={this.handleInputChange('address')}
                  underlineColorAndroid={'transparent'}
                  placeholder={'Vendor address'}
                />
                <View style={styles.userAddressAvatar}>
                  <Text style={styles.userAddressAvatarText}>A</Text>
                </View>
              </View>
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
                <View style={styles.mt30}>
                  <Text style={styles.inputLabel}>Amount (BTC)</Text>
                  <View style={styles.formPaymentAmountWrapper}>
                    <TextInput
                      style={styles.inputField}
                      value={formValues.btc}
                      autoCorrect={false}
                      onChangeText={this.handleInputChange('btc')}
                      underlineColorAndroid={'transparent'}
                      placeholder={'BTC'}
                    />
                      <Text style={styles.formPaymentAmountEqually}>=</Text>
                    <TextInput
                      style={styles.inputField}
                      value={formValues.usd}
                      autoCorrect={false}
                      onChangeText={this.handleInputChange('usd')}
                      underlineColorAndroid={'transparent'}
                      placeholder={'USD'}
                    />
                  </View>
                </View>
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
                      value={formValues.usd}
                      autoCorrect={false}
                      onChangeText={this.handleInputChange('usd')}
                      underlineColorAndroid={'transparent'}
                      placeholder={'Write your comment here'}
                      multiline
                    />
                  </View>
                </View>}
          </View>
          <View style={styles.formPaymentSubmitWrapper}>
            <TouchableOpacity onPress={this.handleSubmit} activeOpacity={0.8}>
              <View style={styles.formPaymentSubmitButton}>
                <Text style={styles.formPaymentSubmitButtonText}>
                  Pay 0.1019 BTC
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default CustomerWallet
