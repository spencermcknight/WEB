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
  type:  
  {
      type:String,
      default:"user"
  }
});

const userModel =mongoose.model("Users",userSchema);

module.exports=userModel;