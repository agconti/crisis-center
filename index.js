const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = Number(process.env.PORT) || 3000
const fixtures = require('./fixtures')


// app config
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// static files
app.use(express.static(`jspm_packages`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
app.get('/config.js', (req, res) => res.sendFile(`${__dirname}/config.js`))

// api routes
app.get('/crises', (req, res) => {
  res.send(fixtures.CRISES)
})

app.get('/crises/:id', (req, res) => {
  res.send(fixtures.CRISES.find(crisis => crisis.id = req.params.id))
})

app.get('/heroes', function(req, res){
  res.send(fixtures.HEROES)
})

app.get('/heroes/:id', function(req, res){
  res.send(fixtures.HEROES.find(hero => hero.id = req.params.id))
})


app.listen(port, () => console.log(`App is live at http://localhost:${port}/`))
