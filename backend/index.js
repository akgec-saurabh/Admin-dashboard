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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.use("/api", getData);

app.use((req, res, next) => {
  const error = new Error("This route could not be found");
  error.code = 404;
  throw error;
});

app.get((err, req, res, next) => {
  res.status(500).json({ message: err.message || "some unknow error occured" });
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
