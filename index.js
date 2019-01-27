var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/YelpCamp", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.use(express.static("public"));

//SCHEMA

var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    desc : String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//     name : "Little Beaver",
//     image : "https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg",
//     desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Purus sit amet luctus venenatis lectus magna fringilla. Eget est lorem ipsum dolor sit amet. Donec enim diam vulputate ut pharetra. Venenatis cras sed felis eget. At tellus at urna condimentum mattis. Eget nunc lobortis mattis aliquam faucibus purus in massa tempor. Lobortis feugiat vivamus at augue eget arcu. Amet consectetur adipiscing elit duis. Tellus integer feugiat scelerisque varius morbi enim. Non blandit massa enim nec dui nunc mattis. Ultrices eros in cursus turpis massa. Elementum nisi quis eleifend quam." +

// "Mauris sit amet massa vitae. Neque egestas congue quisque egestas diam in. Eget nunc lobortis mattis aliquam faucibus. Risus feugiat in ante metus. Congue nisi vitae suscipit tellus mauris a diam maecenas. Purus faucibus ornare suspendisse sed. Vitae tempus quam pellentesque nec nam. Mauris sit amet massa vitae tortor condimentum lacinia quis vel. At ultrices mi tempus imperdiet nulla malesuada. Elementum nisi quis eleifend quam adipiscing. Morbi tincidunt augue interdum velit euismod in pellentesque."
//     },
//     function(err, campground){
//     if(err){
//         console.log("ERROR");
//     }else{
//         console.log(campground);
//     }
// });

//   var campgrounds = [
//       {name : "Florala State Park", image : "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//       {name : "Spearhead Point", image : "https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg"},
//         {name : "Colter Bay", image : "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},
//       {name : "Little Beaver", image : "https://images.pexels.com/photos/1758303/pexels-photo-1758303.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},
//       {name : "Colter Bay", image : "https://images.unsplash.com/photo-1539146395724-de109483bdd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
//       {name : "Little Beaver", image : "https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg"},
//       {name : "Rincon Parkway", image : "https://images.unsplash.com/photo-1534120222876-e411db0e6d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
//       {name : "Florala State Park", image : "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//       {name : "Spearhead Point", image : "https://australia.businessesforsale.com/australian/static/articleimage?articleId=12982&name=image2.jpg"},
//         {name : "Colter Bay", image : "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},
//       {name : "Little Beaver", image : "https://images.pexels.com/photos/1758303/pexels-photo-1758303.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
//         ];  
        
        
app.use(bodyParser.urlencoded({extended : true}));
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