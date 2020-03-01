const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');



router.get("/", function(req, res){
    res.render("index");
});

//==========================
//user authentication route
//==========================

//signup
router.get("/signup", function(req, res){
    res.render("auth/signup")
});

router.post("/signup", function(req, res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp" +" "+ user.username)
            res.redirect("/campgrounds");
        });
    });    
});

//login
router.get("/login", function(req, res){
    res.render("auth/login")
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
})

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully Logged Out")
    res.redirect("/campgrounds");
})


module.exports = router;