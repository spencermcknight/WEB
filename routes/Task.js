const express = require('express')
const router = express.Router();
const Task = require("../models/Task");
const fileupload = require("express-fileupload");
const path = require("path");


router.post('/uploadRoom', (req,res) => {

    if(req.files != null && req.body.roomName != null && req.body.roomPrice != null)
    {
        req.files.foo.mv("./public/images/" + req.files.foo.name);

        const newRoom = {
            path : ("images/" + req.files.foo.name),
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