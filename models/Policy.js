const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyNumber: String,
  policyMode: String,
  premiumAmount: Number,
  premiumAmountWritten: Number,
  policyType: String,
  startDate: Date,
  endDate: Date,
  producer: String,
  csr: String,
  primary: String,
  applicantId: String,
  hasActiveClientPolicy: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  carrierId: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Policy", policySchema);
