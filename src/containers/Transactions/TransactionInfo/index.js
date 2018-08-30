import React, { Component } from 'react'
import { string, object, func } from 'prop-types'
import moment from 'moment'
// components
import { Card, CardHeader, CardContent, Divider, CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { withStyles, Avatar } from '@material-ui/core'
import Review from 'components/TransactionReview'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
import { calculateTotalSpent } from 'helpers/transactions'
import { get, flatten } from 'lodash'
// icons
import BlockchainIcon from '@material-ui/icons/Search'
import ExplorerIcon from '@material-ui/icons/Explore'
import SentIcon from '@material-ui/icons/CallMade'
import ReceivedIcon from '@material-ui/icons/CallReceived'
import NotChluIcon from '@material-ui/icons/ErrorOutline'
import UnconfirmedIcon from '@material-ui/icons/Sync'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/ErrorOutline'

const styles = {
  card: {
    margin: '30px'
  }
}

function openInNewTab(url) {
  if (url) {
    const win = window.open(url, '_blank');
    win.focus();
  }
}

class TransactionInfo extends Component {

  static propTypes = theme => ({
    transaction: object,
    address: string,
    convertSatoshiToBits: func,
    convertFromBitsToUsd: func
  })

  render () {
    const {
            classes,
            transaction,
            address,
            convertSatoshiToBits,
            convertFromBitsToUsd,
            review,
            editing
        } = this.props

        // Tx
    const date = moment(transaction.received).calendar()
    const inputAddresses = flatten(transaction.inputs.map(i => i.addresses))
    const allOutputAddresses = flatten(transaction.outputs.map(o => o.addresses))
    const outputAddresses = allOutputAddresses.filter(i => i && inputAddresses.indexOf(i) < 0)
    const fromAddress = inputAddresses[0]
    const toAddress = outputAddresses[0]
    const isReceived = toAddress === address
        // Bitcoin stuff
    const amount = calculateTotalSpent(transaction, isReceived ? fromAddress : toAddress)
    const priceBits = convertSatoshiToBits(amount)
    const confirmations = get(transaction, 'confirmations', 0)
    const priceBitsFormatted = formatCurrency(priceBits)
        // Chlu review stuff
    const isChlu = Boolean(review)
    const reviewIsLoading = isChlu && review.loading
    const reviewIsReady = isChlu && !review.loading
    const reviewMultihash = isChlu ? review.multihash : null
    const reviewIsUpdate = Boolean(review && review.last_version_multihash)
    const reviewDate = reviewIsUpdate ? null : date
        // Links
    const chainExplorerLink = `${process.env.REACT_APP_BTC_EXPLORER_URL_TX}/${transaction.hash}`
    const chluExplorerLink = isChlu ? `https://explorer.chlu.io/#/v/${reviewMultihash}` : null
        
    let status = {
      primary: 'Confirmed',
      icon: ValidIcon,
      color: 'green',
      secondary: isChlu ? `Chlu data valid. ${confirmations} confirmations` : `${confirmations} confirmations`
    }
    if (isChlu && review && review.error) {
      status = {
        primary: 'Invalid',
        icon: InvalidIcon,
        color: 'red',
        secondary: 'Chlu data invalid'
      }
    } else if (confirmations < 6) {
      status = {
        primary: 'Unconfirmed',
        color: 'orange',
        icon: UnconfirmedIcon,
        secondary: `${confirmations}/6 confirmations`
      }
    }

    const PaymentIcon = isReceived ? ReceivedIcon : SentIcon

    return <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar><PaymentIcon/></Avatar>}
                title={`${isReceived ? 'Received' : 'Sent'} ${priceBitsFormatted} bits ${date}`}
                subheader={`${isReceived ? 'From' : 'To'} ${isReceived ? fromAddress : toAddress}`}
            />
            <Divider/>
            { !isChlu && <CardHeader
                avatar={<Avatar><NotChluIcon/></Avatar>}
                title={`Not a Chlu Transaction`}
                subheader={`This Transaction does not contain valid Chlu data`}
            />}
            { reviewIsLoading && <CardHeader
                avatar={<CircularProgress/>}
                title={`Fetching Review data from IPFS...`}
                subheader={`This might take some time`}
            />}
            { reviewIsReady && <Review
                convertFromBitsToUsd={convertFromBitsToUsd}
                convertSatoshiToBits={convertSatoshiToBits}
                transaction={transaction}
                date={reviewDate}
                review={review}
                editing={editing}
            /> }
            <Divider/>
            <CardContent>
                <List dense disablePadding>
                    <ListItem>
                        <ListItemIcon><status.icon style={{ color: status.color }} /></ListItemIcon>
                        <ListItemText
                            primary={status.primary}
                            secondary={status.secondary}
                        />
                    </ListItem>
                    <ListItem button onClick={() => openInNewTab(chainExplorerLink)}>
                        <ListItemIcon><BlockchainIcon/></ListItemIcon>
                        <ListItemText primary='View on Blockchain' secondary={transaction.hash}/>
                    </ListItem>
                    { isChlu && <ListItem button onClick={() => openInNewTab(chluExplorerLink)}>
                        <ListItemIcon><ExplorerIcon/></ListItemIcon>
                        <ListItemText primary='View on Chlu Explorer' secondary={reviewMultihash}/>
                    </ListItem> }
                </List>
            </CardContent>
        </Card>
  }
}

export default withStyles(styles)(TransactionInfo)
