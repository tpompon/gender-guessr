const express = require("express");
const cors = require("cors");
const axios = require("axios");
const config = require("./config");
const mysql = require("mysql");
const { database } = config;

require("./db");

const app = express();
app.use(
  cors({
    origin: [`http://localhost:3000`, `http://127.0.0.1:3000`]
  })
);

// Routes
app.get("/random", async (req, res) => {
  const db = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.name
  });

  const randomId = Math.floor(Math.random() * 299);
  db.query(
    `SELECT * FROM firstnames WHERE id=${randomId}`,
    async (err, result) => {
      if (err) res.json({ error: err });
      const firstname = JSON.parse(JSON.stringify(result))[0].firstname;
      const genderReq = await axios.get(
        `https://api.genderize.io/?name=${firstname
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")}` // Remove accents for API treatement
      );
      res.json({ firstname: firstname, gender: genderReq.data.gender });
    }
  );
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Gender Guessr! - API");
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("Gender Guessr! - Not found");
});

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}/`);
});
