import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import EditReviewForm from 'containers/Transactions/EditReviewForm'
import Button from '@material-ui/core/Button'
// actions
import { submitEditedReview , cancelEditReview, editReview } from 'store/modules/data/reviews'
import { CardActions, CardContent } from '@material-ui/core';

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
    {editing === multihash && <CardContent>
        <EditReviewForm
          onSubmit={submit}
          handleCancel={cancel}
          initialValues={{
            comment: review.review_text,
            rating: review.rating
          }}
          isLoading={loading}
        />
      </CardContent>}
    {review.editable && editing !== multihash && <CardActions>
        <Button
          onClick={() => showEditForm(multihash)}
          disabled={Boolean(editing)}
        >Edit</Button>
      </CardActions>
    }
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
