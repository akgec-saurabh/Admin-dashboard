const mongoose = require("mongoose");
const schema = mongoose.Schema;

const dataSchema = new schema({});

module.exports = mongoose.model("Data", dataSchema);
