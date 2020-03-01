const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      localPass = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      methodOverRide = require('method-override'),
      expressSession = require("express-session"),
      mongoose   = require("mongoose"),
      flash = require("connect-flash"),
      Campground = require("./models/campground"),
      Comment = require("./models/comments"),
      User = require("./models/users"),
      seedDB = require("./seeds");

const campgroundRoute = require("./routes/campground"),
      commentsRoute   = require("./routes/comment"),
      indexRoute      = require("./routes/index");        

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
});      

//port number
const port = 3000;
//body parser use
app.use(bodyParser.urlencoded({extended: true}));
//for starting the engine
app.set("view engine", "ejs");

app.use(flash());

app.use(express.static(__dirname + "/public"));

app.use(methodOverRide("_method"));

app.use(expressSession({
    secret: "yasin yakin dui anda",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPass(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments",commentsRoute);




app.listen(port, function(){
    console.log("server is running...");
});