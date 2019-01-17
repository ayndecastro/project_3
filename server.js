const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();
require("./routes/BYTrip")(app);
require("./routes/default")(app);
require("./routes/user")(app);



if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
  }
  
  app.use(cors());
  
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI
);

const PORT = 3001;

app.listen(PORT, ()=>  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  ));
