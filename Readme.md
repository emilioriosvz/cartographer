# Cartographer
This package tries to make integration with different map providers easier by returning the same result whether you are using gmaps, osm, etc.

## Install
  `npm i cartograph`

## How to use

### Google maps

Get [here](https://developers.google.com/maps/documentation/javascript/get-api-key) your API Key
```js
const { createGmaps } = require('cartograph')
const gmaps = createGmaps({
  params: { key: 'YOUR_GMAPS_API_KEY_HERE' }
})

const result = await gmaps.search('Barcelona') // returns an array of locations.
```

### Open Street Map
```js
const { createOSM } = require('cartograph')
const osm = createOSM()
const result = await osm.search('Barcelona') // returns an array of locations.
```

In the case of osm you can request the geojson of a location by passing their `osmId`:
```js
const geojson = await osm.searchGeoJSON(347950) // returns the geojson of Barcelona.
```

Also, if you have an osm object (raw) you can pass it to get an updated response. The method will take from the object the `osm_id` and the `osm_type` to collect the osm info:
```js
const result = await osm.searchGeoJSON({
  // ... the rest of the object is ignored.
  osm_id:"347950",
  osm_type:"relation"
}) // returns an array with the location Object
```

## Common search response for all integrations (Location Objects)
```js
const result = [{
  address: String,
  lon: Number,
  lat: Number,
  bbox: [
    [Number, Number], // south - lat, west - lon
    [Number, Number]  // north - lat, east - lon
  ],
  raw: {} // unprocessed response, as returned by the source
}]
```
