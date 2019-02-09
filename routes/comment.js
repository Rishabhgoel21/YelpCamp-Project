var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

//COMMENT New
router.get("/new",isLoggedIn, function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgound){
        if(err){
            console.log("ERROR");
        }else{
            res.render("comment/new", {campground: campgound});    
        }
    });
});

//Comment Create
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgound){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                   if(err){
                       console.log(err);
                   }else{
                       Comment.author.id = req.user._id;
                       Comment.author.username = req.user.username;
                       campgound.comments.push(comment);
                       campgound.save();
                       res.redirect("/campgrounds/" + campgound._id)
                   }
                       });  
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;