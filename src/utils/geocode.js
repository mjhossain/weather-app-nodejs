const apiKey = require('../api-key')
const request = require('postman-request')

const geocode = (addr, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=${apiKey.addrAPI}&limit=1`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Could not connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Could not find location, try another!', undefined)
        } else {
            callback(undefined, {
                lon: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;