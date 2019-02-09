var mongoose = require("mongoose");

//SCHEMA

var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    desc : String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
        ],
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }
});

var Campground = mongoose.model("Campground",campgroundSchema);

module.exports = Campground;