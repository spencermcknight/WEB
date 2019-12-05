const express = require('express')
const router = express.Router();
const Task = require("../models/Task");
const hasAccess = require("../middleware/auth")

router.use(express.static('public'));

router.get('/roomListings',hasAccess, (req, res)=> {
    Task.find({})
        .then(result=>{
            let admintype = [];
            console.log(`user type is: ${res.locals.user.type}`);
            if(res.locals.user.type != "admin")
            {
                res.render('roomListings',
                {
                rooms:result
                })
            }
            else
            {
                admintype.push("1");
                res.render('roomListings',
                {
                rooms:result,
                adm:admintype
                })
            }
            
        })
});

router.post('/roomSearch',hasAccess, (req, res)=> {
    Task.find({location: req.body.where})
        .then(result=>{
            searched = [];
            searched.push(`Search Result For: ${req.body.where}`);
            console.log(`location result: ${result}`);
            res.render("roomListings",
            {
                rooms:result,
                sear:searched
            })
        })
});

router.post('/search', (req, res)=> {
    res.render('search')
});

module.exports=router;