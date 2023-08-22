const express = require("express");
const app = express();
const mongoose = require("mongoose");

let checkDB = "waiting for connection";

// For environment variables
require("dotenv").config();
// Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    checkDB = "Connected with mongo";
  })
  .catch((e) => console.log(e));

app.get("/home", (req, res) => {
  res.send(checkDB);
});

const Schema = mongoose.Schema;

// Create schema
const StationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  properties: {
    type: Object,
    required: true,
  },
  geometry: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const Station = mongoose.model("station", StationSchema);

app.get("/stations", (req, res) => {
  Station.find()
    .then((station) => {
      res.status(200).send(station);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is up on " + port);
});

// Fore deploying to Vercel as serverless, https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel
module.exports = app;
