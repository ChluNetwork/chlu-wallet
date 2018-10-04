import { createAction, handleActions } from 'redux-actions'
// Helpers
import { get } from 'lodash'
import { getChluAPIClient } from 'helpers/chlu'
import { createDAGNode } from 'chlu-api-client/src/utils/ipfs'
import { getFormValues } from 'redux-form'

// Constants
const SET_CRAWLER_STATUS = 'crawler/STATUS'
const SET_POLLING = 'crawler/POLLING'
const SET_LOADING = 'crawler/LOADING'
const SET_STARTING = 'crawler/STARTING'

const API_URL = process.env.REACT_APP_CHLU_PUBLISH_URL || 'https://publish.chlu.io'
const POLL_INTERVAL = 5000 // ms

function getInitialState() {
  return {
    starting: false,
    loading: false,
    running: false,
    jobs: [],
    shouldPoll: true,
    polling: false,
    error: null
  }
}

const setCrawlerStatus = createAction(SET_CRAWLER_STATUS)
const setPolling = createAction(SET_POLLING)
const setLoading = createAction(SET_LOADING)
const setStarting = createAction(SET_STARTING)

export function startCrawler(type, url, username, password) {
  return async (dispatch, getState) => {
    const state = getState()
    try {
      dispatch(setStarting(true))
      const signedInDid = get(state, 'data.wallet.did', null)
      const signedOutDid = get(state, 'components.createWallet.walletCreated.did', null)
      const did = signedInDid || signedOutDid
      const publicDidDocument = did.publicDidDocument
      const didId = publicDidDocument.id
      const body = { type, url, didId, username, password }
      const chluApiClient = await getChluAPIClient()
      const dagNode = await createDAGNode(Buffer.from(JSON.stringify(body)))
      const signature = await chluApiClient.didIpfsHelper.signMultihash(dagNode.toJSON().multihash, did)

      const response = await fetch(`${API_URL}/api/v1/crawl`, {
        method: 'POST',
        body: JSON.stringify({ ...body, publicDidDocument, signature }),
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
      // TODO: error handling
    }
    dispatch(setStarting(false))
  }
}

export function importReviews() {
  return async (dispatch, getState) => {
    //TODO: check logged in, and that crawler is not already running
    const values = getFormValues('import-reviews')(getState())
    const servicesList = ['yelp', 'tripadvisor', 'fiverr', 'linkedin', 'upwork']
    let count = 0
    for (const service of servicesList) {
      if (get(values, `${service}-user`) || get(values, `${service}-url`)) {
        count = count + 1
        await dispatch(startCrawler(service,
          get(values, `${service}-url`),
          get(values, `${service}-user`),
          get(values, `${service}-password`)
        ))
      }
    }
    // TODO: The form fields should be cleared here
    return count
  }
}

export function pollCrawlerStatus() {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    const shouldPoll = get(state, 'data.crawler.shouldPoll', false)
    const polling = get(state, 'data.crawler.polling', false)
    if (shouldPoll && didId && !polling) {
      dispatch(setPolling(true))
      let first = true
      do {
        if (first) dispatch(setLoading(true))
        await dispatch(getCrawlerStatus(didId))
        await sleep(POLL_INTERVAL)
        if (first) dispatch(setLoading(false))
        first = false
      } while (shouldPoll)
      dispatch(setPolling(false))
    }

  }
}

function getCrawlerStatus(didId) {
  return async dispatch => {
    try {
      const response = await fetch(`${API_URL}/api/v1/crawl/${didId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await response.json()
      if (responseJson.rows) dispatch(setCrawlerStatus(responseJson.rows))
    } catch (err) {
      // TODO: error handling
      console.error(err)
    }
  } 
}

function hasRunningJobs(jobs) {
  for (const job of jobs) {
    if (job.status === 'RUNNING' || job.status === 'CREATED') return true
  }
  return false
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default handleActions({
  [SET_POLLING]: (state, { payload: polling }) => ({
    ...state,
    polling
  }),
  [SET_CRAWLER_STATUS]: (state, { payload: jobs }) => {
    const running = hasRunningJobs(jobs)
    return { ...state, jobs, running }
  },
  [SET_STARTING]: (state, { payload: starting }) => ({
    ...state,
    starting
  }),
  [SET_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  }),
}, getInitialState())
