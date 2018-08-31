import { createAction, handleActions } from 'redux-actions'
import { get } from 'lodash'

import { readMyReputation } from './reputation'

// Constants
const CRAWLER_START = 'crawler/START'
const CRAWLER_ERROR = 'crawler/ERROR'
const CRAWLER_FINISH = 'crawler/FINISH'

const API_URL = process.env.REACT_APP_CHLU_PUBLISH_URL || 'https://publish.chlu.io'
const CRAWLER_PROGRESS_POLL_INTERVAL = 5000 // ms

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
    try {
      const signedInDid = get(state, 'data.wallet.did', null)
      const signedOutDid = get(state, 'components.createWallet.walletCreated.did', null)
      const did = signedInDid || signedOutDid
      const didId = did.publicDidDocument.id

      const response = await fetch(`${API_URL}/api/v1/crawl`, {
        method: 'POST',
        body: JSON.stringify({ type, url, didId, username, password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

      const responseJson = await response.json()

      console.log('Crawlers running:')
      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  }
}

export function pollCrawlerProgress() {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)

    if (!didId) {
      console.error("Cannot read crawler progress without DID ID.")
      return
    }

    let isBackendCrawlingInProgress = false
    let wasBackendCrawlingInProgress = false

    do {
      isBackendCrawlingInProgress = await readCrawlerProgress(didId)

      console.log('crawler running state: ' + isBackendCrawlingInProgress)

      if (isBackendCrawlingInProgress) {
        dispatch(startCrawlerAction())

        // Wait a bit before polling again.
        await new Promise(resolve => window.setTimeout(resolve, CRAWLER_PROGRESS_POLL_INTERVAL))
      } else {
        if (wasBackendCrawlingInProgress) {
          // If the crawler was running on the backend before, we should assume new reviews are available now.
          readMyReputation()(dispatch, getState)
        }

        dispatch(finishCrawler())
      }

      wasBackendCrawlingInProgress = isBackendCrawlingInProgress
    } while (isBackendCrawlingInProgress)
  }
}

async function readCrawlerProgress(didId) {
  try {
    const response = await fetch(`${API_URL}/api/v1/crawl?didid=${didId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    return responseJson.running
  } catch (err) {
    console.error(err)
    return false
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
