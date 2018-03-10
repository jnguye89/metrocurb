const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const mongoose = require("mongoose");
const logger = require("morgan");
const zoho = require('./routes/zoho');



// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/metrocurb";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const mydb = mongoose.connection;


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: mydb }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// Add routes
app.use(routes);

app.use(logger("dev"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// If there are any errors connecting to the db
mydb.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });
  
// For a successful connection
mydb.once("open", function() {
  console.log("Successfully connected to the Mongoose database!");
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//****NOTE THAT THESE ROUTES CAN BE TESTED LOCALLY BY GOING TO LOCALHOST:3001****//

//get all leads
app.get("/api/leads", function(req, res) {

  zoho.getLeads(function (err, result) {
 		if (err !== null) {
    		console.log(err);
  		} else if (result.isError()) {
    		console.log(result.message);
  		} else {
  
    	res.send(result.data);
    	}
  });
  
});

//create one contact (which is hard coded in zoho module right now)
app.post("/api/contacts/create",function(req,res){
	zoho.createContact(function(err,result){
		if (err !== null) {
    		console.log(err);
  		} else if (result.isError()) {
    		console.log(result.message);
  		} else {
  
    	res.send(result.data);
    	}
	})
})

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});


