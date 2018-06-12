import React from 'react'
import { string, func, array } from 'prop-types'
// components
import TransactionInfo from 'components/Transactions/TransactionInfo'

const VendorTransactions = ({ date, transactions, reviews, ...props }) => (
  <div>
    {transactions.map((transaction, index) => {
      return <TransactionInfo
        key={index}
        address={transaction.addresses[0]}
        transaction={transaction}
        convertSatoshiToBits={props.convertSatoshiToBits}
        convertSatoshiToBTC={props.convertSatoshiToBTC}
        convertFromBtcToUsd={props.convertFromBtcToUsd}
        convertFromBitsToUsd={props.convertFromBitsToUsd}
        review={reviews.reviews[item.hash]}
        editing={reviews.editing}
      />
    })}
  </div>
)

VendorTransactions.propTypes = {
  date: string,
  transactions: array,
  convertSatoshiToBits: func,
  convertFromBitsToUsd: func
}

const mapStateToProps = state => ({
  reviews: state.data.reviews
})

export default compose(
  WithChluIPFS(types.customer), // TODO: review this
  withFxRates,
  withVendorTransactions,
  connect(mapStateToProps)
)(VendorTransactions)