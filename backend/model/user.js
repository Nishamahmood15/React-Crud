const db = require("mongoose");

const user = new db.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password :{
    type : String,
    required: true
  },
  resetPasswordToken :{
    type :String
  },
  tokenExpired :{
    type : String
  }
});
 
const myUser = db.model('myUser',user);
 module.exports = myUser;