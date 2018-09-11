import React, { Component } from 'react'
import PropTypes from 'prop-types'
// components
import { CardHeader, Divider, CardContent, CircularProgress, CardActions, Button, TextField } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import PaymentForm from './PaymentForm'
import PaymentMethods from './PaymentMethods'
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { getCheckout, cancelPayment } from 'store/modules/data/checkout'
import { fetchBalance } from 'store/modules/data/wallet';
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment, paymentStepLoadingMessages } from 'store/modules/data/payment'
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import BalanceIcon from '@material-ui/icons/AttachMoney'
import VendorIcon from '@material-ui/icons/Shop'
import PaymentDestinationIcon from '@material-ui/icons/ArrowForward'
import MarketplaceIcon from '@material-ui/icons/Store'
import AmountIcon from '@material-ui/icons/Payment'
import CommentIcon from '@material-ui/icons/Comment'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
// helpers
import { getAddress } from 'helpers/wallet';
import { get, isEmpty } from 'lodash'

const starCount = 5

class Payment extends Component {

  constructor(props) {
    super(props)
    this.state = { amount: 0 }
  }

  componentDidMount() {
    this.props.fetchBalance()
  }
  
  componentWillUnmount() {
    this.cancel()
  }

  componentDidUpdate(prevProps) {
    if (this.props.didId !== prevProps.didId) {
      this.cancel()
    }
  }

  getCheckout = () => {
    const amountMBtc = this.state.amount
    const amountSat = amountMBtc * 100000
    return this.props.getCheckout(this.props.didId, amountSat)
  }

  cancel = () => {
    this.setState({ amount: 0 })
    this.props.cancelPayment()
  }

  changeAmount = (event) => {
    const amountMBtc = event.target.value
    this.setState({ amount: amountMBtc })
  }

  handleSubmit = async (data) => {
    const review = data.review || ''
    const rating = this.props.rating
    await this.props.submitPayment({ review, rating })
  }

  render() {
    const {
      wallet,
      checkout: {
        data: popr,
        loading: checkoutLoading,
        error: checkoutError
      },
      loading,
      loadingStep,
      loadingMessage,
      paymentError,
      profile
    } = this.props

    const signedOut = isEmpty(get(wallet, 'did.publicDidDocument.id'))
    const vendorAddress = get(profile, 'vendorAddress')
    const address = getAddress(wallet)
    const payingSelf = address === vendorAddress
    const loadingSteps = paymentStepLoadingMessages.length - 1
    const error =
      (get(paymentError, 'message') ? paymentError.message : paymentError)
      || (get(checkoutError, 'message') ? checkoutError.message : checkoutError)
      || (vendorAddress ? 'Unknown Error' : 'Missing vendor payment address')

    if (signedOut) {
      return <CardHeader
        avatar={<Avatar><ErrorIcon/></Avatar>}
        title='Not Signed In'
        subheader='You need to sign in to send payments'
      />
    } else if (payingSelf) {
      return <CardHeader
        avatar={<Avatar><ErrorIcon/></Avatar>}
        title='Sending payment to yourself'
        subheader="You can't send a payment to yourself"
      />
    } if (checkoutError || !vendorAddress) {
      return <CardHeader
        avatar={<Avatar><ErrorIcon/></Avatar>}
        title='Something went wrong while fetching Payment Information'
        subheader={error}
      />
    } else if (checkoutLoading || get(wallet, 'loading')) {
      return <CardHeader
        avatar={<CircularProgress/>}
        title='Fetching Payment Information...'
        subheader='Please wait'
      />
    } else if (loading) {
      return <CardHeader
        avatar={<CircularProgress/>}
        title={`Paying and Submitting Review (Step ${loadingStep}/${loadingSteps})`}
        subheader={loadingMessage || 'Please wait...'}
      />
    } else if (popr) {
      return this.renderConfirmPaymentForm()
    } else {
      return this.renderPreparePaymentForm()
    }
  }

  renderPreparePaymentForm() {
    const {
      wallet,
      profile,
      convertSatoshiToBTC,
      convertFromBtcToUsd
    } = this.props
    const { amount } = this.state

    const amountMBtc = amount
    const amountSatoshi = amountMBtc * 100000
    const amountBtc = convertSatoshiToBTC(amountSatoshi)
    const amountUSD = convertFromBtcToUsd(amountBtc)
    const address = getAddress(wallet)
    const balanceSat = get(wallet, 'balance.final_balance', 0)
    const balance = balanceSat / 100000 // mbtc
    const balanceSufficient = balanceSat >= amountSatoshi
    const vendorAddress = get(profile, 'vendorAddress')

    return <div>
      <CardHeader
        avatar={<Avatar><WalletIcon/></Avatar>}
        title='Send Payment'
        subheader='Choose a payment method'
      />
      <Divider/>
      <PaymentMethods />
      <Divider/>
      <CardContent>
        <List dense disablePadding>
          <ListItem>
            <ListItemIcon><AmountIcon/></ListItemIcon>
            <ListItemText
              primary={<TextField
                type='number'
                value={amount}
                onChange={this.changeAmount}
                error={!balanceSufficient}
                helperText={balanceSufficient ? `You will pay ${amountMBtc} Testnet mBTC (${amountUSD} tUSD)` : `You do not have enough funds to cover this payment`}
              />}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><WalletIcon/></ListItemIcon>
            <ListItemText primary='Your tBTC Wallet (testnet)' secondary={`You will pay with your funds in ${address}`}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><BalanceIcon/></ListItemIcon>
            <ListItemText primary='Your tBTC Balance (testnet)' secondary={`${balance} mBTC`}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><PaymentDestinationIcon/></ListItemIcon>
            <ListItemText primary='Vendor Wallet' secondary={`Your payment will go to ${vendorAddress}`}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><CommentIcon/></ListItemIcon>
            <ListItemText
              primary='Chlu Enabled'
              secondary='You will be able to leave a Decentralised Review backed by this payment.'
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button disabled={!amount || !balanceSufficient} onClick={this.getCheckout}>Prepare Payment</Button>
      </CardActions>
    </div>
  }

  renderConfirmPaymentForm() {
    const {
      wallet,
      checkout: {
        data: popr
      },
      profile,
      rating,
      setRating,
      convertSatoshiToBTC,
      convertFromBtcToUsd
    } = this.props

    const amountSatoshi = popr.amount
    const amountBtc = convertSatoshiToBTC(amountSatoshi)
    const amountUSD = convertFromBtcToUsd(amountBtc)
    const amountText = `${amountBtc} tBTC | ${amountUSD} tUSD`
    const address = getAddress(wallet)
    const vendorAddress = get(profile, 'vendorAddress')

    return <div>
      <CardHeader
        avatar={<Avatar><WalletIcon/></Avatar>}
        title='Send Prepared Payment'
        subheader='If you want, you can leave a review. You can also add or edit your review later'
      />
      <Divider/>
      <PaymentMethods />
      <Divider/>
      <CardContent>
        <List dense disablePadding>
          <ListItem>
            <ListItemIcon><AmountIcon/></ListItemIcon>
            <ListItemText primary='Amount Prepared' secondary={amountText}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><WalletIcon/></ListItemIcon>
            <ListItemText primary='Your tBTC Wallet (testnet)' secondary={`You will pay with your funds in ${address}`}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><PaymentDestinationIcon/></ListItemIcon>
            <ListItemText primary='Vendor Wallet' secondary={`Your payment will go to ${vendorAddress}`}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><VendorIcon/></ListItemIcon>
            <ListItemText primary='Chlu Vendor' secondary={popr.marketplace_vendor_url}/>
          </ListItem>
          <ListItem>
            <ListItemIcon><MarketplaceIcon/></ListItemIcon>
            <ListItemText primary='Chlu Marketplace' secondary={popr.marketplace_url}/>
          </ListItem>
        </List>
      </CardContent>
      <Divider/>
      <PaymentForm
        starCount={starCount}
        rating={rating}
        setRating={setRating}
        onSubmit={this.handleSubmit}
        onCancel={this.cancel}
      />
    </div>
  }
}

Payment.propTypes = {
  loading: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    wallet: state.data.wallet,
    checkout: state.data.checkout,
    rating: state.components.customerWallet.rating,
    loading: state.data.payment.loading,
    paymentError: state.data.payment.error,
    loadingMessage: state.data.payment.loadingMessage,
    loadingStep: state.data.payment.loadingStep
  }
}

const mapDispatchToProps = {
  getCheckout,
  submitPayment,
  cancelPayment,
  fetchBalance,
  setRating: setRatingForCustomerWallet
}

export default compose(
  withFxRates,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Payment)
