import React, { Component } from 'react'
import PropTypes from 'prop-types'
// components
import { Card, CardHeader, Divider, CardContent, CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Avatar, withStyles } from '@material-ui/core'
import PaymentForm from './PaymentForm'
import PaymentMethods from './PaymentMethods'
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { getCheckout } from 'store/modules/data/checkout'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment } from 'store/modules/data/payment'
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import VendorIcon from '@material-ui/icons/Shop'
import PaymentDestinationIcon from '@material-ui/icons/ArrowForward'
import MarketplaceIcon from '@material-ui/icons/Store'
import AmountIcon from '@material-ui/icons/Payment'
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
const defaultAmount = 1000

class Payment extends Component {

  componentDidMount() {
    // TODO: provide checkout data from props
    this.props.getCheckout({ vendorId: this.props.didId, amount: defaultAmount })
  }

  componentDidUpdate(prevProps) {
    if (this.props.didId !== prevProps.didId) {
      // TODO: provide checkout data from props
      this.props.getCheckout({ vendorId: this.props.didId, amount: defaultAmount })
    }
  }

  async handleSubmit(data) {
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
      profile,
      rating,
      setRating,
      convertSatoshiToBTC,
      convertFromBtcToUsd
    } = this.props

    const submitDisabled = !popr || checkoutLoading || checkoutError
    const amountSatoshi = popr.amount
    const amountBtc = convertSatoshiToBTC(amountSatoshi)
    const amountUSD = convertFromBtcToUsd(amountBtc)
    const amountText = `${amountUSD} tUSD | ${amountBtc} tBTC`
    const address = getAddress(wallet)
    const vendorAddress = get(profile, 'vendorAddress')
    const error =
      (checkoutError ? checkoutError.message : checkoutError)
      || (vendorAddress ? 'Unknown Error' : 'Missing vendor payment address')

    if (checkoutError || !vendorAddress) {
      return <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar><ErrorIcon/></Avatar>}
          title='Something went wrong while fetching Payment Information'
          subheader={error}
        />
      </Card>
    } else if (checkoutLoading) {
      return <Card className={classes.card}>
        <CardHeader
          avatar={<CircularProgress/>}
          title='Fetching Payment Information...'
          subheader='Please wait'
        />
      </Card>
    } else {
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
              <ListItemText primary='Amount Requested' secondary={amountText}/>
            </ListItem>
            <ListItem>
              <ListItemIcon><WalletIcon/></ListItemIcon>
              <ListItemText primary='Your tBTC Wallet' secondary={address}/>
            </ListItem>
            <ListItem>
              <ListItemIcon><PaymentDestinationIcon/></ListItemIcon>
              <ListItemText primary='Vendor Wallet' secondary={vendorAddress}/>
            </ListItem>
            <ListItem>
              <ListItemIcon><VendorIcon/></ListItemIcon>
              <ListItemText primary='Vendor URL' secondary={popr.marketplace_vendor_url}/>
            </ListItem>
            <ListItem>
              <ListItemIcon><MarketplaceIcon/></ListItemIcon>
              <ListItemText primary='Marketplace URL' secondary={popr.marketplace_url}/>
            </ListItem>
          </List>
        </CardContent>
        <Divider/>
        <PaymentForm
          starCount={starCount}
          rating={rating}
          setRating={setRating}
          disabled={submitDisabled}
          onSubmit={this.handleSubmit.bind(this)}/>
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
    rating: state.components.customerWallet.rating
  }
}

const mapDispatchToProps = {
  getCheckout,
  submitPayment,
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
