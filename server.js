const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const user =require('./routes/user');
const byt = require('./routes/BYTrip');
const defaultApi = require('./routes/default');
const bodyParser = require('body-parser');
const router = express.Router();

<<<<<<< HEAD
<<<<<<< HEAD
require('dotenv').config();
require("./routes/BYTrip")(app);
require("./routes/default")(app);
require("./routes/user")(app);
=======
<<<<<<< HEAD
=======

>>>>>>> a42b7d45cd4ac306c4bab32f38db55891353ad8b

  
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
<<<<<<< HEAD
// Add routes, both API and view
app.use(routes);
=======
require("./routes/BYTrip")(app);
require("./routes/default")(app);
>>>>>>> f7661ee421622df1ff59f4d8b9da3d8d38edf291
>>>>>>> 2aad836f454bbb6b5121dca5ce3b30bb2a27f584

=======
>>>>>>> a42b7d45cd4ac306c4bab32f38db55891353ad8b


if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
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
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.log(err);
  next();
});

require("./routes/BYTrip")(app);
require("./routes/default")(app);
app.use('/api', user)

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  ));
