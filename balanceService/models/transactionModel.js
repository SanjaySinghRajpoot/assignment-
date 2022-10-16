const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    transaction: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionModel);
