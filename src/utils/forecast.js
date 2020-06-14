const apiKey = require('../api-key')
const request = require('postman-request')

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey.weatherAPI}&query=${lat},${lon}&units=f`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another!', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                desc: body.current.weather_descriptions[0],
                feels: body.current.feelslike,
                rain: body.current.precip * 100,
                loc: `${body.location.name}, ${body.location.region}, ${body.location.country}`
            })
        }
    })
}

module.exports = forecast