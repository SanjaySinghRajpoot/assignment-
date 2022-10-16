const mongoose = require("mongoose");

const currencyModel = new mongoose.Schema(
  {
    ethereum: {
      inr: {
        type: Number,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ethereum", currencyModel);
