import React, { Component } from 'react'
import { string, object, func } from 'prop-types'
import moment from 'moment'
// components
import CircularProgress from 'material-ui/CircularProgress'
import Review from 'components/Review'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
import { calculateTotalSpent } from 'helpers/transactions'
import { get } from 'lodash'
// styles
import './style.css'

class TransactionInfo extends Component {

    static propTypes = {
        transaction: object,
        address: string,
        convertSatoshiToBits: func,
        convertFromBitsToUsd: func
    }

    render () {
        const {
            transaction,
            address,
            convertSatoshiToBits,
            convertFromBitsToUsd,
            review,
            editing
        } = this.props

        const amount = calculateTotalSpent(transaction, address)
        const priceBits = convertSatoshiToBits(amount)
        const confirmations = get(transaction, 'confirmations', 0)
        const priceBitsFormatted = formatCurrency(priceBits)
        const date = moment(transaction.received).calendar()
        const reviewIsUpdate = Boolean(review && review.last_version_multihash)
        const reviewDate = reviewIsUpdate ? null : date
        
        return (
            <div className='transaction__info'>
                <div className='field'>
                    <div className='field__title'>Tx</div>
                    <div className='field__data'>
                        <a href={`${process.env.REACT_APP_BTC_EXPLORER_URL_TX}/${transaction.hash}`}>{transaction.hash}</a></div>
                </div>
                <div className='field field-address'>
                    <div className='field__title'>To</div>
                    <div className='field__data'>
                        <a href={`${process.env.REACT_APP_BTC_EXPLORER_URL_ADDRESS}/${address}`}>{address}</a>
                    </div>
                </div>
                <div className='field field-date'>
                    <div className='field__title'>Date</div>
                    <div className='field__data'>{date}</div>
                </div>
                <div className='field field-amount'>
                    <div className='field__title '>Amount</div>
                    <div className='field__data'>{priceBitsFormatted} bits</div>
                </div>
                <div className='field field-confirm'>
                    <div className='field__title'>Confirmations</div>
                    <div className={`field__data font-weight-bold ${confirmations < 6 ? 'yellow' : 'green'}`}>
                        {confirmations}
                    </div>
                </div>
                <div className='review container-border-top container-border-bottom'>
                    {
                        review ? (
                            review.loading
                            ? <CircularProgress style={{ display:'block', margin:'auto' }}/>
                            : <Review
                                  convertFromBitsToUsd={convertFromBitsToUsd}
                                  convertSatoshiToBits={convertSatoshiToBits}
                                  transaction={transaction}
                                  date={reviewDate}
                                  review={review}
                                  editing={editing}
                                  editable={true}
                              />
                        ) : <div className='field-not-chlu'>Not a Chlu transaction</div>
                    } 
                </div>
            </div>
        )
    }

}    

export default TransactionInfo
