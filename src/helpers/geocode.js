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
  if (!query) return undefined;

  let url = `${ENDPOINT}/geocoding/v5/${SOURCE}/${encodeURIComponent(query)}.json?access_token=${ACCESS_TOKEN}`;
  let response = await fetch(url, { headers: HEADERS });
  let responseJson = await response.json();

  console.log(responseJson);

  if (responseJson.features && responseJson.features[0]) {
    return {
      latitude: responseJson.features[0].center[0],
      longitude: responseJson.features[0].center[1],
      bounds: responseJson.features[0].bbox,
      place_name: responseJson.features[0].place_name,
      text: responseJson.features[0].text
    };
  } else {
    return undefined;
  }
}

export async function autocomplete(query) {
  if (!query) return [];

  let url = `${ENDPOINT}/geocoding/v5/${SOURCE}/${encodeURIComponent(query)}.json?access_token=${ACCESS_TOKEN}`;
  let response = await fetch(url, { headers: HEADERS });
  let responseJson = await response.json();

  if (responseJson.features) {
    return responseJson.features.map(feature => feature.place_name);
  } else {
    return [];
  }
}

/**
 * @param latitude Latitude coordinate of the place to look up.
 * @param longitude Longitude coordinate of the place to look up.
 * @returns {Array<{}>}
 */
export async function reverseGeocode(latitude, longitude) {
  let url = `${ENDPOINT}/geocoding/v5/${SOURCE}/${longitude},${latitude}.json?access_token=${ACCESS_TOKEN}&types=place`;
  let response = await fetch(url, { headers: HEADERS });
  let responseJson = await response.json();

  if (responseJson && responseJson.features && responseJson.features.length > 0) {
    return responseJson.features;
  } else {
    return undefined;
  }
}
