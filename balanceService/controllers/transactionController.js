const axios = require("axios");
const transactionModel = require("../models/transactionModel");
const currencyModel = require("../models/curerencyModel");

const getUserDetails = async (req, res) => {
  try {
    let address = req.params.address;
    let found = await transactionModel.findOne({ address });

    // get the balance from the data base
    let balance = found.transaction;
    let ethereumPrice = await currencyModel.find();
    let price = ethereumPrice[0].ethereum.inr;
    let result = {
      userBalance: balance,
      ethreumPrice: price,
    };

    return res.status(200).send({ msg: "user details fetched", data: result });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

//07 transaction

const dealing = async (req, res) => {
  try {
    console.log(req.query.choice);

    // if the User Address is given in the URL or a default address will be taken
    let UserAddress =
      req.params.user !== ""
        ? req.params.user
        : "0xce94e5621a5f7068253c42558c147480f38b5e0d";

    // Either the query choice will match or the "to" address will be matched to the given User address
    if (req.query.choice === "to" || req.params.address1 === UserAddress) {
      let us1 = await transactionModel.findOne({
        address: req.params.address1,
      });
      let user1Money = us1.transaction; //money from add2

      let us2 = await transactionModel.findOne({
        address: req.params.address2,
      });
      let user2Money = us2.transaction;

      let update1 = {}; // to
      let update2 = {}; // from

      // Money will be deducted from the sender account and added to the reveicer account
      update1["transaction"] = user1Money + req.query.value;
      update2["transaction"] = user2Money - req.query.value;

      await transactionModel.findOneAndUpdate(
        { address: req.params.address1 },
        update1
      );
      await transactionModel.findOneAndUpdate(
        { address: req.params.address2 },
        update2
      );

      let data = await transactionModel.findOne({
        address: req.params.address1,
      });
      return res.status(200).send({ data: data });
    } else {
      let us1 = await transactionModel.findOne({
        address: req.params.address1,
      });
      let user1Money = us1.transaction; //money from add2

      let us2 = await transactionModel.findOne({
        address: req.params.address2,
      });
      let user2Money = us2.transaction;

      let update1 = {}; // to
      let update2 = {}; // from

      // Money will be added to the reveicer account
      update1["transaction"] = user1Money - req.query.value;
      update2["transaction"] = user2Money + req.query.value;

      await transactionModel.findOneAndUpdate(
        { address: req.params.address1 },
        update1
      );
      await transactionModel.findOneAndUpdate(
        { address: req.params.address2 },
        update2
      );

      let data = await transactionModel.findOne({
        address: req.params.address1,
      });
      return res.status(200).send({ data: data });
    }
  } catch (err) {
    return res.status(500).send({ msg: err.msg });
  }
};

module.exports = { getUserDetails, dealing };
