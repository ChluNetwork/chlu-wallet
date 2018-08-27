import { get } from 'lodash'

const marketplaceUrl = process.env.REACT_APP_MARKETPLACE_URL

export async function getProfile (didId) {
  console.log("getting profile for didID: " + didId)
  const response = await fetch(`${marketplaceUrl}/vendors/${didId}`)
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    return get(data, 'profile', null)
  } else {
    return null
  }
}

export async function setProfile (profileData) {
  throw new Error('Not implemented')
}

export async function updateProfile (didId, profileData) {
  throw new Error('Not implemented')
}

export async function searchProfiles (query, limit, offset ) {
  const response = await fetch(`${marketplaceUrl}/search`, {
    method: 'POST',
    body: JSON.stringify({ query, limit, offset }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  if (response.ok) {
    const data = await response.json()
    return {
      count: data.count,
      rows: data.rows
    }
  } else {
    return { count: 0, rows: [] }
  }
}

const profileProvider = {
  getProfile,
  setProfile,
  updateProfile,
  searchProfiles
}

export default profileProvider