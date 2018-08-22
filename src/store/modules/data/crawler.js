import { createAction, handleActions } from 'redux-actions'
import { readMyReputation } from './reputation'
import { get } from 'lodash'

// Constants
const CRAWLER_START = 'crawler/START'
const CRAWLER_START_IPFS = 'crawler/START_IPFS'
const CRAWLER_ERROR = 'crawler/ERROR'
const CRAWLER_FINISH = 'crawler/FINISH'

const API_URL = process.env.REACT_APP_PUBLISH_API_URL || 'https://publish.chlu.io'

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

export function startCrawler(type, url) {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch(startCrawlerAction())
    try {
      const signedInDid = get(state, 'data.wallet.did', null)
      const signedOutDid = get(state, 'components.createWallet.walletCreated.did', null)
      const did = signedInDid || signedOutDid

      const result = await fetch(`${API_URL}/api/v1/crawl`, {
        method: 'POST',
        body: JSON.stringify({ type, url, did }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

      console.log('crawler finished:')
      console.log(await result.json())

      dispatch(finishCrawler())
      dispatch(readMyReputation())
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
    savingToIPFS: false,
    error: null
  }),
  [CRAWLER_START_IPFS]: state => ({
    ...state,
    running: false,
    savingToIPFS: true
  }),
  [CRAWLER_ERROR]: (state, { payload: error }) => ({
    ...state,
    running: false,
    savingToIPFS: false,
    error
  }),
  [CRAWLER_FINISH]: state => ({
    ...state,
    running: false,
    savingToIPFS: false,
    error: null
  })
}, getInitialState())
