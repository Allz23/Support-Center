let mongoose = require("mongoose");

module.exports.connect = function() {
  mongoose.connect("mongodb://localhost:27017/Support-Center", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error!"));
  db.once("open", function(callback) {
    console.log(`MongoDB online...`);
  });
  return db;
};
