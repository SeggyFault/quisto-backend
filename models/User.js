const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  pob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //phone: { type: Number, required: true },
  //code: { type: String },
  // consent: { 
  //   type: Boolean, 
  //   required: [true, "You must agree to the terms and conditions."],
  //   validate: { 
  //     validator: function(value) {
  //       return value === true;
  //     },
  //     message: "You must agree to the terms and conditions.",
  //   },
  // },
});

module.exports = mongoose.model("User", UserSchema);