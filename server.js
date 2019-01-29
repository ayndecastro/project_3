const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const user =require('./routes/user');
const bodyParser = require('body-parser');
var path = require("path");
console.log(". = %s", path.resolve("."));
console.log("__dirname = %s", path.resolve(__dirname));



  
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

// If no API routes are hit, send the React app
app.get('/callback#access_token=Whz4gJheI8VykQBCYmhzwK26l_OkpDDu&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiQXluIiwiZmFtaWx5X25hbWUiOiJEZWNhc3RybyIsIm5pY2tuYW1lIjoiYXluZGVjYXN0cm8iLCJuYW1lIjoiQXluIERlY2FzdHJvIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tajBYNWlfUXpFc3cvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNldm9RTWxDNmhOM2RxNl9HVnJCSUpXLVBJa2hONVJtQS9tby9waG90by5qcGciLCJnZW5kZXIiOiJtYWxlIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOS0wMS0yOVQwOTowNDo0My43NTZaIiwiaXNzIjoiaHR0cHM6Ly9zYWZlLXRyYXZlbHMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4OTI2NDUyODc1MjM5MDU1ODQyIiwiYXVkIjoiMnlOdmwyMnpWV2c2bGR0cVcwM3U4RmNMU3pQb1g0VFQiLCJpYXQiOjE1NDg3NTI2ODMsImV4cCI6MTU0ODc4ODY4MywiYXRfaGFzaCI6Im1UN3RXbW1kTTFEa3hBME5SeDlCVkEiLCJub25jZSI6InFyRzh0aU5CT3pffnZJUVF3S0pxZHBzZzZMNHpFUVFiIn0.iYol0X1TGCFEz3NtcJYOTHH7-fuwrNGis70Z2GoQFfQ&expires_in=86400&token_type=Bearer&state=P.3aKEz3Sf0z_u5S9O5bewiF3rLCdUx.', function(req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });



const PORT = process.env.PORT;

app.listen(PORT, ()=>  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  ));
