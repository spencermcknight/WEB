const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name:  
    {
        type:String,
    },
    location:  
    {
        type:String,
    },
    description:  
    {
        type:String,
    },
    price:  
    {
        type:String,
    },
    path:  
    {
        type:String,
    },
    type:  
    {
        type:String,
        default:"image"
    }
});

const taskModel =mongoose.model("Rooms",taskSchema);

module.exports=taskModel;