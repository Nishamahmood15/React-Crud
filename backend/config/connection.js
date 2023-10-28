const db = require("mongoose");
URL = process.env.URL;
// connecting database
db.connect(URL, {
  useNewUrlParser: true, //define language b/w db and express
  useUnifiedTopology: true, //maintain the connection and upgradation
})
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

module.exports = db;
