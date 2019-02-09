var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

router.get("/", function(req, res){
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log("ERR");
            }else{
        res.render("campgrounds", {campgrounds : allCampgrounds, currentUser : req.user});
            }
        });
});

router.post("/", isLoggedIn, function(req, res){
       var name = req.body.name;
       var image = req.body.image;
       var desc = req.body.Desc;
       var author = {
           id : req.body._id,
           username : req.body.username
       }
       var newcampground = {name : name, image : image, desc : desc, author : author};
       Campground.create(newcampground,
            function(err, newlyCreated){
            if(err){
                console.log("ERROR");
            }else{
                console.log(newlyCreated);
            }
        });
       res.redirect("/campgrounds");
});

router.get("/new",  isLoggedIn, function(req, res){
    res.render("campground/new");
});

router.get("/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgound){
        if(err){
            console.log("ERROR");
        }else{
            res.render("campground/show", {campground: foundCampgound});    
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