import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
import { setRatingRecentTransaction } from 'store/modules/components/RecentTransaction'
import { IsShowEditForm } from 'store/modules/ui/RecentTransaction'
// components
import Review from 'components/Review'
import EditReviewForm from './EditReviewForm'
import RaisedButton from 'material-ui/RaisedButton'
// libs
import { convertFromBtcToUsd } from 'lib/fxRates'
import { toastr } from 'react-redux-toastr'
// styles
import './style.css'
import styles from 'styles/inlineStyles/containers/Customer/customerWallet'
// constants
const { submitBtnStyle } = styles

const { dataActions: {
  transaction: { submitEditReview }
} } = actions

class RecentTransaction extends Component {

  static propTypes = {
    transaction: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      transactions: PropTypes.array.isRequired
    }).isRequired,
    editRating: PropTypes.number,
    isEditFormOpen: PropTypes.bool
  }

  componentDidMount() {
    const { isEditFormOpen } = this.props

    if(isEditFormOpen) {
      this.hideEditForm()
    }
  }

  handleEditFormSubmit = comment => {
    const {
      routeParams: { userAddress },
      submitEditReview,
      editRating: rating
    } = this.props

    submitEditReview({ userAddress, comment: { ...comment, rating } })
      .then((response) => {
        console.log(response)
        toastr.success('success', 'Edit success')
        this.hideEditForm()
      })
  }

  onStarClick = rating => {
    const { setRating } = this.props

    setRating(rating)
  }

  showEditForm = () => {
    const { IsShowEditForm } = this.props

    IsShowEditForm(true)
  }

  hideEditForm = () => {
    const { IsShowEditForm, editRating } = this.props

    IsShowEditForm(false)

    if(editRating !== 0){
      this.onStarClick(0)
    }
  }

  render() {
    const {
      routeParams: { userAddress },
      transaction: { loading, transactions },
      editRating,
      isEditFormOpen
    } = this.props
    const recentTransaction = transactions.find(({ address }) => address === userAddress)

    let address, date, isChluTransaction, price, review, priceUSD

    if(recentTransaction) {
      ({ address, date, isChluTransaction, price, review } = recentTransaction)
      priceUSD = convertFromBtcToUsd(price)
    }

    return(
      !recentTransaction
        ? <div className='page-container container color-main'>
            Transactions to address <span className='font-weight-bold'>{userAddress}</span> was not
          </div>

        : <div className='page-container recent-transaction color-main'>
          <div className='section-head container'>
            <div className='title font-weight-bold'>Recent Transaction</div>
            <Link to='#' className='address'>{address}</Link>
            <div className='price'>
              <div className='price-title font-weight-bold'>Spent</div>
              <div className='price-spent'>
                <div className='price-spent__item font-weight-bold'>{price} BTC</div>
                <div className='price-spent__item font-smaller'>{priceUSD} USD</div>
              </div>
            </div>
          </div>
          <div className='section-content'>
            <div className='container'>

              <div className='transaction-info__wrapper'>
                <div className='transaction__info'>
                  <div className='field field-address'>
                    <div className='field__title'>To</div>
                    <div className='field__data'>{address}</div>
                  </div>
                  <div className='field field-date'>
                    <div className='field__title'>Date</div>
                    <div className='field__data'>{date}</div>
                  </div>
                  <div className='field field-amount'>
                    <div className='field__title '>Amount</div>
                    <div className='field__data'>{price} BTC</div>
                  </div>
                  {
                    isChluTransaction
                      ? null
                      : <div className='field-not-chlu'>Not Chlu transaction</div>
                  }
                </div>
              </div>

              <div className='review container-border-top container-border-bottom'>
                <Review {...review} isMultipleReview />
              </div>

              <div className='edit-review'>
                {
                  isEditFormOpen
                    ? <EditReviewForm
                        onSubmit={this.handleEditFormSubmit}
                        handleCancel={this.hideEditForm}
                        onStarClick={this.onStarClick}
                        rating={editRating}
                        isLoading={loading}
                      />
                    : <RaisedButton
                        label='Edit'
                        {...submitBtnStyle}
                        onClick={this.showEditForm}
                      />
                }
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  transaction: state.data.transaction,
  editRating: state.components.recentTransaction.rating,
  isEditFormOpen: state.ui.recentTransaction.isEditFormOpen
})

const mapDispatchToProps = {
  submitEditReview,
  setRating: setRatingRecentTransaction,
  IsShowEditForm
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTransaction)
