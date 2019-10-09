const express = require('express')
const axios = require('axios')
const config = require('./config')
const readFile = require('readline').createInterface({
  input: require('fs').createReadStream('names.txt')
})

const app = express()

// Parse names source file in an array
let firstnames = [],
    count      = 0

readFile.on('line', (line) => {
  if (count < 300)
    firstnames.push(line.split(' ')[0]); count++
})

// Functions
const getRandomFirstname = () => {
	return firstname[Math.ceil(Math.random() * 299)]
}

// Routes
app.get('/', (req, res) => {
	res.send('Welcome on server')
})

app.get('/random', (req, res) => {

})

app.listen(config.port, () => {
	console.log(`Server listening on http://127.0.0.1:${config.port}/`)
})
