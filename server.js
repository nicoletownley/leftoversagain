
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let userRoutes = require('./controllers/api/user');
let itemRoutes = require('./controllers/api/item');
let cors = require('cors');
let path = require('path');
let passport = require ('passport');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
//set up port for listening on designated port or 3000
let PORT = process.env.PORT||3001;
// express app
let app = express();
//express router
let router = express.Router();

// Create a session for each request Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'test secret only for development',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


// Passport middleware

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id)
        .then(user => cb(null, user))
        .catch(err => cb(err));
});


// passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());




//Body parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client/public')));
//pubic folder as static directory


//have everything go through middleware
app.use('/api/user', userRoutes); 
app.use('/api/item', itemRoutes); 
//if deployed use that database otherwise use mongose
let db = process.env.MONGODB_URI || "mongodb://localhost:27017/leftovers";
//connect mongose to our database
mongoose.connect(db, function(error) {
    if (error) {
        console.log (error);
    }
    else {
        console.log("mongoose is happening");
    }
});
let User = require('./models/User');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
  });

//tell us what port app is listening at
app.listen(PORT, () => {
    console.log("Listening on port:" + PORT);
});