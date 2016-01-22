'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require ("mongoose")
const port = Number(process.env.PORT) || 3000
const uristring = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  'mongodb://localhost/crisis-center'
const fixtures = require('./fixtures')


// connect to the database
mongoose.connect(uristring, err => {
   if (err) {
     console.error(err)
   }
})

const heroSchema =  mongoose.Schema({ name: String, unique : true, required : true })
const crisisSchema =  mongoose.Schema({ description: String, unique : true, required : true })

heroSchema.method('toJSON', function () {
  return { id: this._id, name: this.name }
})

crisisSchema.method('toJSON', function () {
  return { id: this._id, description: this.description }
})

const Hero = mongoose.model('Hero', heroSchema)
const Crisis = mongoose.model('Crisis', crisisSchema)

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
  Crisis.find({}, (err, crises) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.send(crises)
  })
})

app.get('/crises/:id', (req, res) => {
  let id = req.params.id

  Crisis.findById(id, (err, crisis) => {
    if (err) {
      return res.status(500).send(err)
    }

    if (!crisis) {
      let msg = `Could Not find crisis with id: ${id}`
      return res.status(404).send({msg})
    }

    res.send(crisis)
  })
})

app.get('/heroes', function(req, res){
  Hero.find({}, (err, heroes) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.send(heroes)
  })
})

app.get('/heroes/:id', function(req, res){
  let id = req.params.id

  Hero.findById(id, (err, hero) => {
    if (err) {
      return res.status(500).send(err)
    }

    if (!hero) {
      let msg = `Could Not find hero with id: ${id}`
      return res.status(404).send({msg})
    }

    res.send(hero)
  })
})


app.listen(port, () => console.log(`App is live at http://localhost:${port}/`))
