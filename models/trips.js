const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
  country: { type: String, required: true },
  user_id: { type: String, required: true },
  date_leave: { type: Date },
  date_back: { type: Date },
<<<<<<< HEAD
  budget: {type: Number },
  totalCost: {type: Number},
=======
>>>>>>> 8a0d0e39c17fe9c6a284c8339c499bd1ff20456f
  updated_at: { type: Date, default: Date.now },
  current: {type: Boolean, default: false},
  totalCost: {type: Number, required: true}
});

const Trips = mongoose.model("Trips", tripsSchema);

module.exports = Trips;
