const express = require("express");
const mongoose = require('mongoose');
const app = express();



require("./routes/BYTrip")(app);
require("./routes/default")(app);

app.get('/api/users', (req,res) => {
    const users = [
        {
        id: 1,
        Email: "sampleOne@email.com",
        firstName: "FirstOne",
        lastName: "LastOne"
    },
    {
        id: 2,
        Email: "sampleTwo@email.com",
        firstName: "FirstTwo",
        lastName: "LastTwo"
    }
]; res.json(users)
})

const PORT = 5000;

app.listen(PORT, ()=>  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  ));
