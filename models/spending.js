const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  spendingId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserCurrent'},
  spending: { type: Number},
  spendingName: {type: String},
  createdAt:  { type: Date, default: Date.now }
  
});

const Spending = mongoose.model("Spending", spendingSchema);

module.exports = Spending;
