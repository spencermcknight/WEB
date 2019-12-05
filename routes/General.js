const express = require('express')
const router = express.Router();
const Task = require("../models/Task");
const hasAccess = require("../middleware/auth");
const ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/roomListings', (req, res)=> {
    Task.find({})
        .then(result=>{
            if(res.locals.user.admin != true)
            {
                res.render('roomListings',
                {
                rooms:result
                })
            }
            else
            {
                res.render('roomListings',
                {
                rooms:result
                })
            }
            
        })
});

router.post('/roomSearch', (req, res)=> {
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

router.get('/dashboard',hasAccess, (req, res)=> {
    let IDvar = res.locals.user.bookedRoom;
    let o_id = new ObjectId(IDvar);
    Task.findOne({_id:o_id})
        .then(result=>{
            console.log(`booked Room: ${result}`);
            res.render("dashboard",
            {
                rooms:result
            })
        })
        .catch(none=>{
            res.render("dashboard");
        })
});

router.get('/logOut',hasAccess, (req, res)=> {
    req.session.destroy();
    res.redirect("/");
});

router.post('/search', (req, res)=> {
    res.render('search')
});

module.exports=router;