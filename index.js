var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds"),
    Comment    = require("./models/comment"),
    seedDB      = require("./seeds");

//APP CONFIG        
mongoose.connect("mongodb://localhost:27017/YelpCamp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
seedDB();


app.get("/", function(req, res){
    res.render("index");    
});

app.get("/campgrounds", function(req, res){
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log("ERR");
            }else{
        res.render("campground/campgrounds", {campgrounds : allCampgrounds});
            }
        });
});

app.post("/campgrounds",function(req, res){
       var name = req.body.name;
       var image = req.body.image;
       var desc = req.body.Desc;
       var newcampground = {name : name, image : image, desc : desc};
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

app.get("/campgrounds/new", function(req, res){
    res.render("campground/new");
});

app.get("/campgrounds/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgound){
        if(err){
            console.log("ERROR");
        }else{
            res.render("campground/show", {campground: foundCampgound});    
        }
    });
});

//COMMENT Route
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgound){
        if(err){
            console.log("ERROR");
        }else{
            res.render("comment/new", {campground: campgound});    
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgound){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                   if(err){
                       console.log(err);
                   }else{
                       campgound.comments.push(comment);
                       campgound.save();
                       res.redirect("/campgrounds/" + campgound._id)
                   }
                       });  
        }
    });
});

app.listen(process.env.PORT, process.env.IP);