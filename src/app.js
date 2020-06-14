const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();

const port = process.env.PORT || 3000;

// Paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handebars & Views setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Express static setup
app.use(express.static(publicPath))



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            message: 'Error address not provided!'
        })
    } else {
        let addr = req.query.address;
        geocode(addr, (err, { lon, lat } = {}) => {
            if (err) {
                res.send({
                    error: err
                })
            } else {
                forecast(lon, lat, (err, { desc, temp, rain, loc } = {}) => {
                    if (err) {
                        res.send({
                            error: err
                        })
                    } else {
                        res.send({
                            forecast: desc,
                            temperature: temp,
                            rain,
                            location: loc,
                            search: req.query.address
                        })
                    }
                })
            }
        })
    }
})



// 404 Pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Sorry help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Error 404 page not found!'
    })
})


app.listen(port, () => {
    console.log('Running on port 3000')
})