import { createAction, handleActions } from 'redux-actions'
import { getYelpReviews, getUpWorkReviews } from 'helpers/apify'
import { getChluIPFS, importUnverifiedReviews } from 'helpers/ipfs'
import { transformYelpData, transformUpworkData } from 'helpers/reputation/reviews';
import { readMyReputation } from './reputation'
import { get } from 'lodash'

// Constants
const CRAWLER_START = 'crawler/START'
const CRAWLER_START_IPFS = 'crawler/START_IPFS'
const CRAWLER_ERROR = 'crawler/ERROR'
const CRAWLER_FINISH = 'crawler/FINISH'

function getInitialState() {
  return {
    running: false,
    savingToIPFS: false,
    error: null
  }
}

export const crawlerError = createAction(CRAWLER_ERROR)
const startCrawlerAction = createAction(CRAWLER_START)
const startCrawlerIPFS = createAction(CRAWLER_START_IPFS)
export const finishCrawler = createAction(CRAWLER_FINISH)

const crawlerMap = {
  yelp: getYelpReviews,
  upwork: getUpWorkReviews
}

const transformMap = {
  yelp: transformYelpData,
  upwork: transformUpworkData
}

export function startCrawler_client(type, url) {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch(startCrawlerAction())
    try {
      const apifyResults = await crawlerMap[type](url)
      const results = transformMap[type](apifyResults)
      dispatch(startCrawlerIPFS())
      const signedInDid = get(state, 'data.wallet.did', null)
      const signedOutDid = get(state, 'components.createWallet.walletCreated.did', null)
      const did = signedInDid || signedOutDid
      const chluIpfs = await getChluIPFS()
      await chluIpfs.importDID(did)
      await importUnverifiedReviews(results)
      dispatch(finishCrawler())
      dispatch(readMyReputation())
    } catch (error) {
      console.log(error)
      dispatch(crawlerError(error.message || error))
    }
  }
}

export function startCrawler(type, url) {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch(startCrawlerAction())
    try {
      const signedInDid = get(state, 'data.wallet.did', null)
      const signedOutDid = get(state, 'components.createWallet.walletCreated.did', null)
      const did = signedInDid || signedOutDid

      console.log('starting crawler with payload:')
      console.log(JSON.stringify({ type, url, did }));

      // TODO: use API endpoint from env?
      const result = await fetch('http://localhost:3006/api/v1/crawl', {
        method: 'POST',
        body: JSON.stringify({ type, url, did }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      console.log('crawler finished')
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
