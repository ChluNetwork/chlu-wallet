import { get } from 'lodash'

const marketplaceUrl = process.env.REACT_APP_MARKETPLACE_URL

const profileProvider = {
  getProfile: async (didId) => {
    console.log("getting profile for didID: " + didId)
    const response = await fetch(`${marketplaceUrl}/vendors/${didId}`)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return get(data, 'profile', null)
    } else {
      return null
    }
  },
  setProfile: async profileData => {
    throw new Error('Not implemented')
  },
  updateProfile: async (didId, profileData) => {
    throw new Error('Not implemented')
  },
  searchProfiles: async (type, location, name) => {
    throw new Error('Not implemented')
  }
};

export default profileProvider;
