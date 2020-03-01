const Campground = require('../models/campground');
const Comment = require('../models/comments');

//middleware
let middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
}

middlewareObj.checkCommentOwnerShip = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not Found");
                res.redirect("back")
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                }else{
                    req.flash("error", "You don't have permission to that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
}

middlewareObj.checkedCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found")
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                   next(); 
                }else{
                    req.flash("error", "You don't have permission to that")
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
}


module.exports = middlewareObj