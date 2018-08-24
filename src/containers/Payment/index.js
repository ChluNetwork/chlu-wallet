import React, { Component } from 'react'
import PropTypes from 'prop-types'
// components
import { Card, CardHeader, Divider, CardContent, CircularProgress, CardActions, Button, TextField } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Avatar, withStyles } from '@material-ui/core'
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
import { get } from 'lodash'

const style = {
  card: {
    margin: '30px'
  }
}

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
      classes,
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
      profile,
      rating,
      setRating,
      convertSatoshiToBTC,
      convertFromBtcToUsd
    } = this.props
    const { amount } = this.state

    const submitDisabled = !popr || checkoutLoading || checkoutError
    const amountSatoshi = popr ? popr.amount : (amount * 100000)
    const amountMBtc = popr ? convertSatoshiToBTC(popr.amount)/1000 : amount
    const amountBtc = convertSatoshiToBTC(amountSatoshi)
    const amountUSD = convertFromBtcToUsd(amountBtc)
    const amountText = `${amountBtc} tBTC | ${amountUSD} tUSD`
    const address = getAddress(wallet)
    const balanceSat = get(wallet, 'balance.final_balance', 0)
    const balance = balanceSat / 100000 // mbtc
    const balanceSufficient = balanceSat >= amountSatoshi
    const vendorAddress = get(profile, 'vendorAddress')
    const loadingSteps = paymentStepLoadingMessages.length - 1
    const error =
      (get(paymentError, 'message') ? paymentError.message : paymentError)
      || (get(checkoutError, 'message') ? checkoutError.message : checkoutError)
      || (vendorAddress ? 'Unknown Error' : 'Missing vendor payment address')

    if (checkoutError || !vendorAddress) {
      return <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar><ErrorIcon/></Avatar>}
          title='Something went wrong while fetching Payment Information'
          subheader={error}
        />
      </Card>
    } else if (checkoutLoading || get(wallet, 'loading')) {
      return <Card className={classes.card}>
        <CardHeader
          avatar={<CircularProgress/>}
          title='Fetching Payment Information...'
          subheader='Please wait'
        />
      </Card>
    } else if (loading) {
      return <Card className={classes.card}>
        <CardHeader
          avatar={<CircularProgress/>}
          title={`Paying and Submitting Review (Step ${loadingStep}/${loadingSteps})`}
          subheader={loadingMessage || 'Please wait...'}
        />
      </Card>
    } else if (!popr) {
      return <Card className={classes.card}>
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
                  onChange={this.changeAmoun}
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
      </Card>
    } else {
      return <Card className={classes.card}>
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
          disabled={submitDisabled}
          onSubmit={this.handleSubmit}
          onCancel={this.cancel}
        />
      </Card>
    }
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
  withStyles(style),
  withFxRates,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Payment)
