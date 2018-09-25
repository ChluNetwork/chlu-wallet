import React from 'react'
// components
import { CardActions, CardContent, CardHeader, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button'
// icons
import EditReviewForm from 'containers/EditReviewForm'
import EditIcon from '@material-ui/icons/Edit'
import ErrorIcon from '@material-ui/icons/Error'
// redux
import { connect } from 'react-redux'
import { submitEditedReview, cancelEditReview, editReview, publishStepLoadingMessages } from 'store/modules/data/review'
// helpers
import { get } from 'lodash'

const EditReview = props => {
  const {
    multihash,
    review,
    editing,
    publishing,
    publishingStep,
    publishError,
    editReview,
    submitEditedReview,
    cancelEditReview
  } = props
  const reviewOriginalMultihash = get(review, 'originalMultihash', get(review, 'multihash', null))
  const editingMultihash = editing ? reviewOriginalMultihash : null
  const editingThisReview = multihash && reviewOriginalMultihash && editingMultihash === multihash
  return <div>
    {editingThisReview && publishError && <CardHeader
      avatar={<ErrorIcon/>}
      title='Something went wrong'
      subheader={publishError}
    />}
    {editingThisReview && !publishError && publishing && <CardHeader
      avatar={<CircularProgress />}
      title='Publishing your Review Update'
      subheader={`${publishStepLoadingMessages[publishingStep]} (Step ${publishingStep}/${publishStepLoadingMessages.length})`}
    />}
    {editingThisReview && !publishError && !publishing && <CardHeader
      avatar={<EditIcon/>}
      title='Editing this review'
    />}
    {editingThisReview && <CardContent>
        <EditReviewForm
          onSubmit={submitEditedReview}
          handleCancel={cancelEditReview}
          initialValues={{
            title: get(review, 'review.title'),
            comment: get(review, 'review.text'),
            rating: get(review, 'rating_details.value')
          }}
          isLoading={publishing}
        />
      </CardContent>}
    {review.editable && editingMultihash !== multihash && <CardActions>
        <Button
          onClick={editReview}
          disabled={Boolean(editing)}
        >Edit Review</Button>
      </CardActions>
    }
  </div>
}

function mapStateToProps (state) {
  return {
    review: state.data.review.data,
    editing: state.data.review.editing,
    publishError: state.data.review.publishError,
    publishingStep: state.data.review.publishingStep,
    publishing: state.data.review.publishing
  }
}

const mapDispatchToProps = {
  submitEditedReview,
  cancelEditReview,
  editReview
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReview)
