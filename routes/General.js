const express = require('express')
const router = express.Router();
const Task = require("../models/Task");
const hasAccess = require("../middleware/auth")

router.use(express.static('public'));

router.get('/roomListings',hasAccess, (req, res)=> {
    Task.find({})
        .then(result=>{
            console.log(result);
            res.render('roomListings',
                {
                rooms:result
                })
            })
});

router.post('/search', (req, res)=> {
    res.render('search')
});

module.exports=router;