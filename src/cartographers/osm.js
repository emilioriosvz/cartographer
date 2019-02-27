const { search } = require('./common')
const { parseParams } = require('../utils')

// node, way or relation
const getTypeAbbreviation = type => type ? type[0].toUpperCase() : ''

const getUrl = (query, options) => {
  const { params } = options
  const parsedParams = parseParams({ ...params, format: 'json', q: query })
  return `https://nominatim.openstreetmap.org/search?${parsedParams}`
}

const getReverseUrl = (data, options) => {
  const { params } = options
  const { osm_id = 0, osm_type = '' } = data
  const parsedParams = parseParams({
    ...params,
    format: 'json',
    osm_id,
    osm_type: getTypeAbbreviation(osm_type)
  })

  return `https://nominatim.openstreetmap.org/reverse?${parsedParams}`
}

const getGeoJSONUrl = osmId => {
  const parsedParams = parseParams({ id: osmId, params: 0 })
  return `http://polygons.openstreetmap.fr/get_geojson.py?${parsedParams}`
}

const parser = data => {
  if (data.type === 'GeometryCollection') return data

  const parseResult = result => {
    const { lon, lat, display_name: address, boundingbox } = result
    return {
      address,
      lon,
      lat,
      bbox: [
        [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])], // south - west
        [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])] // north - east
      ],
      raw: result
    }
  }

  if (Array.isArray(data)) return data.map(parseResult)
  return [parseResult(data)]
}

const osmProvider = (options = {}) => ({
  search: query => search({
    getUrl: () => getUrl(query, options),
    parser
  }),
  searchGeoJSON: osmId => search({
    getUrl: () => getGeoJSONUrl(osmId),
    parser
  }),
  reverseSearch: (rawOsmObject = {}) => search({
    getUrl: () => getReverseUrl(rawOsmObject, options),
    parser
  })
})

module.exports = osmProvider
