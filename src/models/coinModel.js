const mongoose = require("mongoose");


// coin model
const coinModel = new mongoose.Schema(
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

module.exports = mongoose.model("Ethereum", coinModel);
