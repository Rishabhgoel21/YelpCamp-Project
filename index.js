var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds"),
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
        res.render("campgrounds", {campgrounds : allCampgrounds});
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
    res.render("new");
});

app.get("/campground/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampgound){
        if(err){
            console.log("ERROR");
        }else{
            res.render("show", {campground: foundCampgound});    
        }
    });
});

app.listen(process.env.PORT, process.env.IP);