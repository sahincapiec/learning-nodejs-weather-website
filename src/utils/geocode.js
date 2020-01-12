//mapbox: 
const request = require('request')

const getLocation = (address, callback) => {
  const urlFormatted = encodeURIComponent(address)
  const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlFormatted}.json?access_token=pk.eyJ1Ijoic2FtaXItaGluY2FwaWUtY2VpYmEiLCJhIjoiY2s0Y29yZnIwMDUzajNycDRuNDFwOTRudyJ9.7rIwxFwAPtOFMR7vPR2tEw`

  request(urlMapBox, { json: true }, (error, data) => {
    if (error) {
      switch (error) {
        default:
          callback('Unable to connet with geocoding service', undefined)
      }
    }
    else {
      const features = data.body.features[0]
      if (features) {
        callback(undefined, { longitude: features.center[0], latitude: features.center[1], location: features.place_name })
      }
      else {
        callback('Unable to find location', undefined)
      }
    }
  })
}

module.exports = getLocation