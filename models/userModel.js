const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 30
  },
  loginType: {
    type: String,
    default: "user"
  },
  email: {
    type: String,
    required: [true, "Please Enter your name"],
    unique: [true, "The email exists"],
    lowercase: true,
    validate: {
      validator: function(email) {
        console.log(this.name);
        console.log(validator.isEmail(email));
        return validator.isEmail(email);
      },
      message: "Please provide a valid email id"
    }
  }
  // photo: {
  //   type: String
  // }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
