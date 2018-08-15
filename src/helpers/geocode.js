const ENDPOINT = 'https://api.tiles.mapbox.com';
const SOURCE = 'mapbox.places';
const ACCESS_TOKEN = 'pk.eyJ1Ijoiam9obndlaXN6IiwiYSI6ImNqa3NheWoyNTQzMHkzcW8zem4waTMyMmkifQ._qzWXiBScWpNONx6BxWvgg';
const HEADERS = {
  'Content-Type': 'application/json'
};

/**
 * @param {string} query The location to geocode, as human readable text string (e.g. _"Silent Hill, Pennsylvania"_).
 * @returns {Promise<{ latitude: number, longitude: number }>}
 */
export async function geocode(query) {
  // let searchTime = new Date();
  let url = `${ENDPOINT}/geocoding/v5/${SOURCE}/${encodeURIComponent(query)}.json?access_token=${ACCESS_TOKEN}`;
  let response = await fetch(url, { headers: HEADERS });
  let responseJson = await response.json();

  if (responseJson.features && responseJson.features[0]) {
    return {
      latitude: responseJson.features[0].center[0],
      longitude: responseJson.features[0].center[1],
      bounds: responseJson.features[0].bbox
    };
  } else {
    return undefined;
  }
}
