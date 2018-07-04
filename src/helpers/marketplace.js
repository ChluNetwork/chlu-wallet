import axios from 'axios'

export async function requestPopr(url, vendorId, options = {}) {
  const response = await axios.post(url + '/vendors/' + vendorId + '/popr', {
    ...options
  })
  console.log('PoPR From Marketplace:')
  console.log(response.data)
  return response.data.popr
}