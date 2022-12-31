const express = require("express");
const fs = require("fs");
const https = require("https");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const { getData } = require("./controllers/getData");

const key = fs.readFileSync("/home/private.key");
const cert = fs.readFileSync("/home/certificate.crt");
const app = express();

// app.use(cors);

const cerd = {
  key,
  cert,
};

app.use("/api", getData);

app.get((erroe, req, res, next) => {
  const error = new Error("This route not found");
  error.code = 500;
  res.status(500).json({ message: error.message });
});

console.log(process.env.MONGO_URI_DASHBOARD);

mongoose
  .connect(process.env.MONGO_URI_DASHBOARD)
  .then(() => {
    const httpsServer = https.createServer(cerd, app);
    httpsServer.listen(process.env.PORT);
    console.log("DB Connection Success");
  })
  .catch(() => {
    console.log("DB Connection failed");
  });
