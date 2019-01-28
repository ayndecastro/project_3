const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  spending: { type: Number},
  spendingName: {type: String},
  createdAt:  { type: Date, default: Date.now },
  
});

const userCurrentSchema = new Schema({
  country: { type: String, required: true },
  date_leave: { type: Date, required: true },
  date_back: { type: Date, required: true },
  budget: {type: Number, required: true},
  budgetToUpdate: {type: Number, required: true},
  updated_at: { type: Date, default: Date.now },
  current: {type: Boolean, default: true},
  trip_photo: {type: Array}
});

const tripsSchema = new Schema({
  country: { type: String, required: true },
  date_leave: { type: Date },
  date_back: { type: Date },
  updated_at: { type: Date, default: Date.now },
  current: {type: Boolean, default: false},
  totalCost: {type: Number, required: true},
  budget: {type:Number, default:0},
});
const userSchema = new Schema({
  user_id: { type: String, required: true },
  trips: [tripsSchema],
  current: [userCurrentSchema],
  spending: [spendingSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
