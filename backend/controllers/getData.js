const mongoose = require("mongoose");
const Data = require("../schema/Data");

const getData = async (req, res, next) => {
  //   mongoose.connection.db.collection("data").find({}, (err, result) => {
  let data = [];

  mongoose.connection.db
    .collection("data")
    .find()
    .forEach((d) => data.push(d))
    .then(() => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ message: "Could not fetch the documents" });
    });
};

exports.getData = getData;
