const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

<<<<<<< HEAD
require('dotenv').config();
require("./routes/BYTrip")(app);
require("./routes/default")(app);
require("./routes/user")(app);
=======
<<<<<<< HEAD

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
=======
require("./routes/BYTrip")(app);
require("./routes/default")(app);
>>>>>>> f7661ee421622df1ff59f4d8b9da3d8d38edf291
>>>>>>> 2aad836f454bbb6b5121dca5ce3b30bb2a27f584



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
