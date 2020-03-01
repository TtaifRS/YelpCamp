const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middlewar');

//index route
router.get("/", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err)
        }else{
            res.render("campground/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    }) 
});

//new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campground/new")
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username : req.user.username
    };
    var newCampground = {name : name, image : image, description : desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Campground Created");
            res.redirect("/campgrounds");
        }
    })
});


//show route
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, findCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campground/show", {campground: findCampground})
        }
    });
});

//edit and update route
router.get("/:id/edit", middleware.checkedCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/:id");
        }else{
            res.render("campground/edit", {campground: foundCampground});
        }
    })
})

router.put("/:id", middleware.checkedCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            res.redirect("/:id");
        }else{
            req.flash("success", "Updated")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//destroy route
router.delete("/:id", middleware.checkedCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success", "Deleted")
            res.redirect("/campgrounds")
        }
    })
})



module.exports = router;