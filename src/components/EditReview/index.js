import React from 'react'
// components
import { CardActions, CardContent, CardHeader, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
// icons
import EditReviewForm from 'containers/EditReviewForm'
import EditIcon from '@material-ui/icons/Edit'
// redux
import { connect } from 'react-redux'
import { submitEditedReview, cancelEditReview, editReview } from 'store/modules/data/review'
// helpers
import { get } from 'lodash'

const EditReview = props => {
  const {
    classes,
    multihash,
    reviewMultihash,
    review,
    publishing,
    editing,
    publishingError, // TODO: use this
    showEditForm,
    submit,
    cancel
  } = props
  const editingMultihash = editing ? reviewMultihash : null
  const editingThisReview = editingMultihash === multihash
  return <div>
    {editingThisReview && <CardHeader
      avatar={<EditIcon/>}
      title='Editing this review'
    />}
    {editingThisReview && <CardContent>
        <EditReviewForm
          onSubmit={submit}
          handleCancel={cancel}
          initialValues={{
            comment: get(review, 'review.text'),
            rating: get(review, 'rating_details.value')
          }}
          isLoading={publishing}
        />
      </CardContent>}
    {review.editable && editingMultihash !== multihash && <CardActions>
        <Button
          onClick={() => showEditForm(multihash)}
          disabled={Boolean(editing)}
        >Edit Review</Button>
      </CardActions>
    }
  </div>
}

function mapStateToProps (state) {
  return {
    review: state.data.review.data,
    reviewMultihash: state.data.review.multihash,
    editing: state.data.review.editing,
    publishingError: state.data.review.publishingError,
    publishing: state.data.review.publishing,
    loading: state.data.review.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submit: fields => dispatch(submitEditedReview(fields)),
    cancel: () => dispatch(cancelEditReview()),
    showEditForm: multihash => dispatch(editReview(multihash))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReview)
