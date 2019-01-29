const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const user =require('./routes/user');
const bodyParser = require('body-parser');



  
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


if (!process.env.REACT_APP_AUTH_DOMAIN_ADDRESS|| !process.env.REACT_APP_AUTH_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
  }
  
  
  app.use(cors());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



//connect to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully to ${process.env.MONGODB_URI}`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;
app.use(bodyParser.json({ extended: true }));
app.use((err, req, res, next) => {
  console.log(err);
  next();
});

require("./routes/BYTrip")(app);
require("./routes/default")(app);
app.use('/api', user)

// app.get('/', (req,res)=>{
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// })



const PORT = process.env.PORT;

app.listen(PORT, ()=>  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  ));
