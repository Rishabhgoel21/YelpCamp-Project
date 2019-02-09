var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./models/user"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Campground              = require("./models/campgrounds"),
    Comment                 = require("./models/comment"),
    seedDB                  = require("./seeds");

var commentRoutes   = require("./routes/comment"),
    campgoundRoutes = require("./routes/campground"),
    authRoutes      = require("./routes/auth");
//APP CONFIG        
mongoose.connect("mongodb://localhost:27017/YelpCamp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
seedDB();
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(require("express-session")({
    secret : "You are the best",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", authRoutes);
app.use("/campgrounds", campgoundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP);