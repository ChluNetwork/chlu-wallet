import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import EditReviewForm from 'containers/Customer/Transactions/RecentTransactions/EditReviewForm'
import RaisedButton from 'material-ui/RaisedButton'
import styles from 'styles/inlineStyles/containers/Customer/customerWallet'
// actions
import { submitEditedReview , cancelEditReview, editReview } from 'store/modules/data/reviews'
// constants
const { submitBtnStyle } = styles

const EditReview = props => {
  const {
    multihash,
    reviews,
    loading,
    editing,
    showEditForm,
    submit,
    cancel
  } = props
  const review = _.find(Object.values(reviews), v => v.multihash === multihash)
  return <div>
    {editing === multihash && <EditReviewForm
      onSubmit={submit}
      handleCancel={cancel}
      initialValues={{
        comment: review.review_text,
        rating: review.rating
      }}
      isLoading={loading}
    />}
    {review.editable && editing !== multihash && <RaisedButton
      {...submitBtnStyle}
      label='Edit'
      onClick={() => showEditForm(multihash)}
      disabled={!!editing}
    />}
  </div>
}

function mapStateToProps (state) {
  return {
    reviews: state.data.reviews.reviews,
    editing: state.data.reviews.editing,
    loading: state.data.reviews.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submit: fields => dispatch(submitEditedReview(fields)),
    cancel: () => dispatch(cancelEditReview()),
    showEditForm: multihash => dispatch(editReview(multihash))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditReview)