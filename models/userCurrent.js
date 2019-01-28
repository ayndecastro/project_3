const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  spending: { type: Number},
  spendingName: {type: String},
  createdAt:  { type: Date, default: Date.now },
  
});

const userCurrentSchema = new Schema({
  country: { type: String, required: true },
  user_id: { type: String, required: true },
  date_leave: { type: Date, required: true },
  date_back: { type: Date, required: true },
  budget: {type: Number, required: true},
  budgetToUpdate: {type: Number, required: true},
  spending: [spendingSchema],
  updated_at: { type: Date, default: Date.now },
  current: {type: Boolean, default: true},
  trip_photo: {type: Array}
});

const UserCurrent = mongoose.model("UserCurrent", userCurrentSchema);

module.exports = UserCurrent;
