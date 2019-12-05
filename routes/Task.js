const express = require('express')
const router = express.Router();
const Task = require("../models/Task");
const fileupload = require("express-fileupload");
const path = require("path");
const ObjectId = require('mongodb').ObjectID;

router.post('/editRoom/:id', (req,res) => {
    let IDvar = req.params.id;
    let o_id = new ObjectId(IDvar);
    Task.findOne({_id:o_id})
        .then(result=>{
            console.log(`result: ${result}`);
            result.path = ("images/" + req.files.foo.name);
            result.location = req.body.location;
            result.description = req.body.description;
            result.name = req.body.roomName;
            result.price = req.body.roomPrice;
            result.save();
        })
        .catch(err=> console.log(`error editing room: ${err}`));
        res.render('/gen/roomListings');
});


router.post('/uploadRoom', (req,res) => {

    if(req.files != null && req.body.roomName != null && req.body.roomPrice != null)
    {
        req.files.foo.mv("./public/images/" + req.files.foo.name);

        const newRoom = {
            path : ("images/" + req.files.foo.name),
            location : req.body.location,
            description : req.body.description,
            name : req.body.roomName,
            price : req.body.roomPrice
        }
        const room = new Task(newRoom);
        room.save();

    }
    res.render('index');
})

module.exports=router;