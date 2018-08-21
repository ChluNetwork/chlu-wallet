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

export async function searchProfiles (type, location, name) {
  console.warn('Search filters not implemented')
  const response = await fetch(`${marketplaceUrl}/vendors`)
  if (response.ok) {
    const data = await response.json()
    const vendorProfiles = await Promise.all(data.map(async did => {
      const profile = await getProfile(did)
      profile.did = did
      return profile
    }))
    const vendorProfilesFiltered = vendorProfiles.filter(p => !!p)
    console.log(vendorProfilesFiltered)
    return vendorProfilesFiltered
  } else {
    return []
  }
}

const profileProvider = {
  getProfile,
  setProfile,
  updateProfile,
  searchProfiles
}

export default profileProvider