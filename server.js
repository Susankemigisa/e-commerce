require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");

const app = express();
const port = 3001


const vendorRoutes = require("./routes/vendorRoutes");
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection
  .on('open', () => {
    console.log('connected successfully to mongodb');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//express session configs
app.use(session({
  secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized:false,
   store: MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
   cookie: {maxAge:24*60*60*1000}//one day
}));

// Routes
app.use("/", vendorRoutes);

// non existent route handler
app.use((req, res) =>{
  res.status(404).send("Oops! Route not found.");
});


// Start server
app.listen(port, () => console.log(`listening on port ${port}`)); 
