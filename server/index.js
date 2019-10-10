const express = require('express')
const cors = require('cors')
const axios = require('axios')
const config = require('./config')
const mysql = require('mysql')
const readFile = require('readline').createInterface({
  input: require('fs').createReadStream('names.txt')
})

require('./db')

const app = express()
app.use(cors({
  origin:[`http://localhost:3000`, `http://127.0.0.1:3000`]
}));

// Functions
const getRandomFirstname = async () => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tpompon",
    database: "genderguessr"
  })

  const randomId = Math.floor(Math.random() * 299)
  db.query(`SELECT * FROM firstnames WHERE id=${randomId}`, (err, res) => {
    if (err) throw err
    const firstname = JSON.parse(JSON.stringify(res))[0].firstname
    console.log(firstname)
    db.end()
  })

  // const genderReq = await axios.get(`https://api.genderize.io/?name=${firstname.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`) // Remove accents for API treatement

  // return { firstname: firstname, gender: genderReq.data.gender }
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
