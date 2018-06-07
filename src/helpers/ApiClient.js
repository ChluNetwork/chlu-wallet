import superagent from 'superagent'
// request methods
const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`
}

class _ApiClient {
  constructor () {
    if (_ApiClient.instance) return _ApiClient.instance

    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}, { headers } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))

        if (params) request.query(params)

        if (data) request.send(data)

        request.end((err, { body, header } = {}) =>
          err ? reject(body || err) : headers ? resolve({ header, body }) : resolve(body)
        )
      })
    })

    _ApiClient.instance = this
  }
}

const ApiClient = _ApiClient

export default ApiClient
