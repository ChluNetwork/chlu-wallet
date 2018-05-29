import React, { Component } from 'react'
import PropTypes from 'prop-types'
// components
import { Card, CardHeader, Divider, CardContent, CardActions } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Avatar, withStyles, Button } from '@material-ui/core'
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
import LoadingIcon from '@material-ui/icons/Sync'
import AmountIcon from '@material-ui/icons/Payment'
import ErrorIcon from '@material-ui/icons/ErrorOutline'

const style = {
    card: {
        margin: '30px'
    }
}

const starCount = 5

class Payment extends Component {

    componentDidMount() {
        this.props.getCheckout()
    }

    handleSubmit(data) {
        //this.props.submitPayment()
        const review = data.review || ''
        const rating = this.props.rating
        this.props.submitPayment({ review, rating })
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
            rating,
            setRating,
            convertSatoshiToBits,
            convertSatoshiToBTC,
            convertFromBtcToUsd
        } = this.props

        const submitDisabled = !popr || checkoutLoading || checkoutError
        const amountSatoshi = popr.amount
        const amountBits = convertSatoshiToBits(amountSatoshi)
        const amountBtc = convertSatoshiToBTC(amountSatoshi)
        const amountUSD = convertFromBtcToUsd(amountBtc)
        const amountText = `${amountUSD} USD | ${amountBtc} BTC | ${amountBits} bits | ${amountSatoshi} satoshi`
        const address = wallet.addresses[0]

        if (checkoutError) {
            return <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar><ErrorIcon/></Avatar>}
                    title='Something went wrong'
                    subheader={checkoutError.message || checkoutError || 'Unknown error'}
                />
            </Card>
        } else if (checkoutLoading) {
            return <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar><LoadingIcon/></Avatar>}
                    title='Fetching Payment Request...'
                    subheader='Please wait'
                />
            </Card>
        } else {
            return <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar><WalletIcon/></Avatar>}
                    title='Payment'
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
                            <ListItemText primary='Vendor Wallet' secondary={popr.vendorAddress}/>
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
    handleSubmit: PropTypes.isRequired,
    loading: PropTypes.bool
}

function mapStateToProps(state) {
    return {
        wallet: state.data.wallet,
        checkout: state.data.checkout,
        rating: state.components.customerWallet.rating
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCheckout: () => dispatch(getCheckout()),
        submitPayment: data => dispatch(submitPayment(data)),
        setRating: data => dispatch(setRatingForCustomerWallet(data))
    }
}

export default compose(
    withStyles(style),
    withFxRates,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Payment)