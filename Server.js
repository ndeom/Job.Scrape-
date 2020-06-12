require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT;

app.use(cors());

(async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
  );

  const json = await response.json();

  console.log(json);
})();

app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
