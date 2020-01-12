//darksky: 

const request = require('request')

const getWeather = ({ longitude, latitude }, callback) => {
  const urlDarkSky = `https://api.darksky.net/forecast/eed3c1a372b8c801db0a7139973b3bf6/${latitude},${longitude}`

  request(urlDarkSky, { json: true }, (error, data) => {
    if (error) {
      switch (error) {
        default:
          callback('Unable to connet with darksky service', undefined)
      }
    }
    else {
      const currently = data.body.currently
      if (currently) {
        callback(undefined, { summary: currently.summary, temperature: currently.temperature, precipProbability: currently.precipProbability })
      }
      else {
        callback('Unable to find the weather for given location', undefined)
      }
    }
  })
}

module.exports = getWeather