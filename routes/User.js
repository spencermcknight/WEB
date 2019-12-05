const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.use(express.static('public'));


router.get('/registration', (req, res)=> {
    res.render('registration');
});


router.post('/login-user', (req,res) => {
    User.findOne({email: req.body.email})
        .then(result=>{

            bcrypt.compare(req.body.password, result.password).then(works =>
                {
                if(works == true) 
                {
                    req.session.userInfo = result;
                    console.log(result);
                    console.log(result.password);
                    console.log(`successful log in user : ${result.firstName}` );
                    res.redirect("/");
                } else 
                {
                    console.log("unsuccessful log in");
                    res.redirect("/");
                } 
              });
        })
        .catch(err=>
            {
                let error = [];
                error.push("Incorrect Username or Password");
                res.render("index",
                {
                    index:error
                })
            })
        
});



router.post('/register-user', (req,res) => {
    User.findOne({email: req.body.email})
        .then(result=>{
        const errors =[];
        console.log(result);
        if(result != null)
        {
            errors.push("email already in use");
        }
        if(req.body.firstName=="")
        {
            errors.push("Please enter a first name");
            console.log(errors.length);
        }
        else
        {
            if (!/^[a-zA-Z]*$/g.test(req.body.firstName.value)) {
                errors.push("Only letters in first name");
                req.body.firstName.focus();
            }
        }

        if(req.body.lastName=="")
        {
            errors.push("Please enter a last name")
        }
        else
        {
            if (!/^[a-zA-Z]*$/g.test(req.body.lastName.value)) {
                errors.push("Only letters in last name");
                req.body.lastName.focus();
            }
        }
        if(req.body.email=="")
        {
            errors.push("Please enter an email")
        }
        if(req.body.dob=="")
        {
            errors.push("Please enter a date of birth")
        }

        if(req.body.firstName=="")
        {
            errors.push("Please enter a password")
        }
        if(errors.length > 0)
        {
            console.log("there are errors");
            res.render("index",
            {
            index:errors
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                const newUser = {
                    firstName : req.body.firstName,
                    lastName : req.body.lastName ,
                    email : req.body.email,
                    password : hash,
                    dob: req.body.dob,
                    type : req.body.userType
                }
                const user = new User(newUser);
                user.save();
              });
            
            res.render("index");
        }
    })
});

module.exports=router;