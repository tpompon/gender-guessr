const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tpompon",
})

let count = 0
con.connect((err) => {
  if (err) throw err

  con.query("CREATE DATABASE IF NOT EXISTS genderguessr", (err, result) => {
    if (err) throw err
    console.log("Database genderguessr created")
    con.end(() => {
      const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "tpompon",
        database: "genderguessr"
      })
      
      db.connect((err) => {
        if (err) throw err
        console.log("Database connection established")
      
        db.query("CREATE TABLE IF NOT EXISTS firstnames (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, firstname VARCHAR(100) NOT NULL)", (err, result) => {
          db.query("SELECT COUNT(*) as total FROM firstnames", (err, result) => {
            if (err) throw err
            if (JSON.parse(JSON.stringify(result))[0].total === 0) {
              const readFile = require('readline').createInterface({
                input: require('fs').createReadStream('names.txt')
              })
    
              readFile.on('line', (line) => {
                if (count < 300)
                  db.query(`INSERT INTO firstnames (firstname) VALUES ('${line.split(' ')[0]}')`); count++
              })
              
              console.log('Database has been filled')

            } else console.log('Database is already fill')
          })
        })
      })
    })
  })
})
