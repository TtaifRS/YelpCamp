const mongoose = require("mongoose");



//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;




// Campground.create({
//     name : "Jungle Camp", 
//     image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     description: "This is a Jungle campground. Love the nature and be part of the nature. Happy Camping."
// }, function(err, campground){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(campground)
//     }
// });