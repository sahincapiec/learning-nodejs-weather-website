const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./utils/geocode')
const getWeather = require('./utils/darksky')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup hanldebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Wheather App',
    name: 'Samir Hincapié'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Samir Hincapié'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Samir Hincapié',
    helpText: 'This is some helpful text.'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geolocation(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    else {
      getWeather({ longitude, latitude }, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          })
        }
        else {
          res.send({
            forecast: forecastData.summary,
            location,
            address
          })
        }
      })
    }
  })
})



app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'My 404 page',
    name: 'Samir Hincapié',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'Samir Hincapié',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}.`)
})