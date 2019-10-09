const express = require('express')
const cors = require('cors')
const axios = require('axios')
const config = require('./config')
const readFile = require('readline').createInterface({
  input: require('fs').createReadStream('names.txt')
})

const app = express()

app.use(cors({
  origin:[`http://localhost:3000`, `http://127.0.0.1:3000`]
}));

// Parse names source file in an array
let firstnames = [],
    count      = 0

readFile.on('line', (line) => {
  if (count < 300)
    firstnames.push(line.split(' ')[0]); count++
})

// Functions
const getRandomFirstname = async () => {
  const firstname = firstnames[Math.ceil(Math.random() * 299)]
  const genderReq = await axios.get(`https://gender-api.com/get?name=${firstname}&key=fqfMYtbgCCxtdjywfs`)

  return { firstname: firstname, gender: genderReq.data.gender }
}

// Routes
app.get('/random', async (req, res) => {
  res.status(200)
  res.json(await getRandomFirstname())
})

app.get('*', (req, res) => {
  res.status(200)
	res.send('Gender Guessr! - API')
})

app.get('*', (req, res) => {
  res.status(404)
	res.send('Gender Guessr! - Not found')
})

app.listen(config.port, () => {
	console.log(`Server listening on http://127.0.0.1:${config.port}/`)
})
