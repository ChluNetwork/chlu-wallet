import { createAction, handleActions } from 'redux-actions'
// helpers
import { get, set, cloneDeep } from 'lodash'
import { getChluAPIClient, getChluIPFS } from 'helpers/chlu'
// redux 
import { DELETE_WALLET } from 'store/modules/data/wallet'


// ------------------------------------
// Constants
// ------------------------------------
const READ_REVIEWRECORD_LOADING = 'review/READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'review/READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'review/READ_REVIEWRECORD_ERROR'
const EDIT_REVIEW = 'EDIT_REVIEW'
const EDIT_REVIEW_LOADING = 'EDIT_REVIEW_LOADING'
const EDIT_REVIEW_SUCCESS = 'EDIT_REVIEW_SUCCESS'
const EDIT_REVIEW_ERROR = 'EDIT_REVIEW_ERROR'
const EDIT_REVIEW_CANCEL = 'EDIT_REVIEW_CANCEL'

const getInitialState = () => ({
  loading: false,
  error: null,
  editing: false,
  publishing: false,
  publishError: null,
  multihash: null,
  data: null
})

// ------------------------------------
// Actions
// ------------------------------------
const readReviewRecordLoading = createAction(READ_REVIEWRECORD_LOADING)
const readReviewRecordSuccess = createAction(READ_REVIEWRECORD_SUCCESS)
const readReviewRecordError = createAction(READ_REVIEWRECORD_ERROR)
export const editReview = createAction(EDIT_REVIEW)
export const cancelEditReview = createAction(EDIT_REVIEW_CANCEL)
const editReviewLoading = createAction(EDIT_REVIEW_LOADING)
const editReviewError = createAction(EDIT_REVIEW_ERROR)
const editReviewSuccess = createAction(EDIT_REVIEW_SUCCESS)

export function readReviewRecord (multihash) {
  return async (dispatch, getState) => {
    dispatch(readReviewRecordLoading(multihash))
    try {
      const didId = get(getState(), 'data.wallet.did.publicDidDocument.id', null)
      const chluIpfs = await getChluAPIClient()
      const review = await chluIpfs.readReviewRecord(multihash)
      const customerDidId = get(review, 'customer_signature.creator', null)
      review.editable = didId && customerDidId && didId === customerDidId
      dispatch(readReviewRecordSuccess({ review, multihash }))
    } catch (error) {
      dispatch(readReviewRecordError({ error, multihash }))
    }
  }
}

export function submitEditedReview(fields) {
  return async (dispatch, getState) => {
    try {
      dispatch(editReviewLoading())
      const { editing, multihash, review } = getState().data.review
      if (!editing) throw new Error('User is not editing a review')
      let bitcoinTransactionHash = get(review, 'metadata.bitcoinTransactionHash')
      if (!bitcoinTransactionHash && review.history && review.history.length > 0) {
        const original = review.history[review.history.length-1]
        bitcoinTransactionHash = get(original, 'reviewRecord.metadata.metadata.bitcoinTransactionHash')
      } 
      const updatedReview = cloneDeep(review)
      set(updatedReview, 'previous_version_multihash', multihash)
      set(updatedReview, 'rating_details.value', fields.rating)
      set(updatedReview, 'review.text', fields.comment)
      const chluIpfs = await getChluIPFS()
      const updatedMultihash = await chluIpfs.storeReviewRecord(updatedReview, {
        // TX hash is needed for the validator, since in the browser it can't resolve
        // the tx hash from orbitdb on its own.
        bitcoinTransactionHash
      })
      dispatch(editReviewSuccess({ multihash, updatedMultihash, updatedReview }))
    } catch (error) {
      dispatch(editReviewError(error))
      console.log(error)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [READ_REVIEWRECORD_LOADING]: (state, { payload: multihash }) => ({
    ...state,
    loading: true,
    data: null,
    multihash
  }),
  [READ_REVIEWRECORD_SUCCESS]: (state, { payload: { review, multihash } }) => ({
    ...state,
    multihash,
    data: review
  }),
  [READ_REVIEWRECORD_ERROR]: (state, { payload: { error, multihash } }) => ({
    ...state,
    multihash,
    error
  }),
  [EDIT_REVIEW]: (state, { payload: multihash }) => ({
    ...state,
    editing: true,
    publishing: false,
    error: null
  }),
  [EDIT_REVIEW_LOADING]: state => ({
    ...state,
    publishing: true
  }),
  [EDIT_REVIEW_ERROR]: (state, { payload: error }) => ({
    ...state,
    publishing: false,
    data: null,
    error
  }),
  [EDIT_REVIEW_SUCCESS]: (state, { payload: { multihash, updatedMultihash } }) => {
    return {
      ...state,
      loading: false,
      editing: false,
      error: null // TODO: update the edited review
    }
  },
  [EDIT_REVIEW_CANCEL]: state => ({
    ...state,
    editing: false,
    loading: false
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())

