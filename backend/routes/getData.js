const express = require("express");
const { getData } = require("../controllers/getData");
const router = express.Router();

app.get("/data", getData);

module.exports = router;
