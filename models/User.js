const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName:  
  {
      type:String,
  },
  lastName:  
  {
      type:String,
  },
  email:  
  {
      type:String,
  },
  password:
  {
      type:String,
  },
  dob:
  {
      type:Date,
  },
  admin:  
  {
      type:Boolean,
      default: false
  },
  bookedRoom:
  {
      type:String,
      default:"5de7889b8047722964256f9d"
  }
});

const userModel =mongoose.model("Users",userSchema);

module.exports=userModel;