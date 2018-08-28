import { createAction, handleActions } from 'redux-actions'
import { get } from 'lodash'

// Constants
const CRAWLER_START = 'crawler/START'
const CRAWLER_ERROR = 'crawler/ERROR'
const CRAWLER_FINISH = 'crawler/FINISH'

const API_URL = process.env.REACT_APP_CHLU_PUBLISH_URL || 'https://publish.chlu.io'

function getInitialState() {
  return {
    running: false,
    savingToIPFS: false,
    error: null
  }
}

export const crawlerError = createAction(CRAWLER_ERROR)
const startCrawlerAction = createAction(CRAWLER_START)
export const finishCrawler = createAction(CRAWLER_FINISH)

export function startCrawler(type, url, username, password) {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch(startCrawlerAction())
    try {
      const signedInDid = get(state, 'data.wallet.did', null)
      const signedOutDid = get(state, 'components.createWallet.walletCreated.did', null)
      const did = signedInDid || signedOutDid
      const didId = did.publicDidDocument.id

      const result = await fetch(`${API_URL}/api/v1/crawl`, {
        method: 'POST',
        body: JSON.stringify({ type, url, didId, username, password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

      console.log('crawler finished:')
      console.log(await result.json())

      dispatch(finishCrawler())
    } catch (error) {
      console.log(error)
      dispatch(crawlerError(error.message || error))
    }
  }
}

export default handleActions({
  [CRAWLER_START]: state => ({
    ...state,
    running: true,
    error: null
  }),
  [CRAWLER_ERROR]: (state, { payload: error }) => ({
    ...state,
    running: false,
    error
  }),
  [CRAWLER_FINISH]: state => ({
    ...state,
    running: false,
    error: null
  })
}, getInitialState())
