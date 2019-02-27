const { search } = require('./common')
const { parseParams } = require('../utils')

const getUrl = (query, options) => {
  const { params } = options
  const parsedParams = parseParams({ ...params, address: query })
  return `https://maps.googleapis.com/maps/api/geocode/json?${parsedParams}`
}

const parser = (data = { results: [] }) => data.results.map(result => {
  const {
    geometry: {
      location: { lng: lon, lat },
      viewport: {
        southwest: { lng: swLon, lat: swLat },
        northeast: { lng: neLon, lat: neLat }
      }
    },
    formatted_address: address
  } = result

  return {
    address,
    lon,
    lat,
    bbox: [[swLat, swLon], [neLat, neLon]],
    raw: result
  }
})

const gmaps = options => ({
  search: query => search({
    getUrl: () => getUrl(query, options),
    parser
  })
})

module.exports = gmaps
