export default {
  getProfile: async (didId) => {
    let localProfilesJson = window.localStorage.getItem("chlu-wallet.local-profiles");
    let localProfiles = {};

    if (localProfilesJson) {
      localProfiles = JSON.parse(localProfilesJson);
    }

    console.log("getting profile for didID: " + didId)
    console.log(localProfiles[didId]);

    // Add some artificial delay to mimic API request latency.
    await new Promise(resolve => window.setTimeout(resolve, 200 + 200 * Math.random()));

    return localProfiles[didId];
  },
  setProfile: async (didId, profileData) => {
    let localProfilesJson = window.localStorage.getItem("chlu-wallet.local-profiles");
    let localProfiles = {};

    console.log("writing profile with didID: " + didId);
    console.log(profileData);

    if (localProfilesJson) {
      localProfiles = JSON.parse(localProfilesJson);
    }

    localProfiles[didId] = profileData;

    window.localStorage.setItem("chlu-wallet.local-profiles", JSON.stringify(localProfiles));

    // Add some artificial delay to mimic API request latency.
    await new Promise(resolve => window.setTimeout(resolve, 200 + 200 * Math.random()));
  },
  searchProfiles: async (type, location, name) => {
    let localProfilesJson = window.localStorage.getItem("chlu-wallet.local-profiles");
    let localProfiles = {};
    let filteredProfiles = [];

    if (localProfilesJson) {
      localProfiles = JSON.parse(localProfilesJson);
    }

    // Add some artificial delay to mimic API request latency.
    await new Promise(resolve => window.setTimeout(resolve, 200 + 200 * Math.random()));

    if (!name) {
      return Object.values(localProfiles);
    }

    for (let id of Object.keys(localProfiles)) {
      let profile = localProfiles[id];
      let firstName = profile.firstname || "";
      let lastName = profile.lastname || "";

      if (firstName.indexOf(name) !== -1 || lastName.indexOf(name) !== -1) {
        filteredProfiles.push({
          ...profile,
          id: id
        });
      }
    }

    return filteredProfiles;
  }
};
