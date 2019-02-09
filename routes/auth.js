var express                 = require("express"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    User                    = require("../models/user"),
    router                  = express.Router();

router.get("/", function(req, res){
    res.render("index");    
});

//Register Route
router.get("/register", function(req, res) {
   res.render("register"); 
});

//register logic
router.post("/register", function(req, res){
    var newUser = new User({username : req.body.username});
    User.register(newUser , req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       } else{
           passport.authenticate("local")(req, res, function(){
              res.redirect("/campgrounds"); 
           });
           }
    });
});

//LOGIN Route
router.get("/login", function(req, res) {
   res.render("login"); 
});

//Login logic
// app.post("", middleware, callback);
router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect : "/login",
}) ,function(req, res){
});

//Logout Route
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;