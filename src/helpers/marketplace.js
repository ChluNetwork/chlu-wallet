import axios from 'axios'

export async function requestPopr(url, vendorId, options = {}) {
  const response = await axios.post(url + '/vendors/' + vendorId + '/popr', {
    ...options
  })
  return response.data.popr
}