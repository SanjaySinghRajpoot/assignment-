const axios = require("axios");
const transactionModel = require("../models/transactionModel");
const coinModel = require("../models/coinModel");

//1. Develop an API  fetch the crypto transactions of a user using address..
const transcation = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.address}&tag=latest&apikey=${process.env.API_KEY}`,
    };
    let result = await axios(options);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    res.status(500).send({ msg: err});
  }
};

//2.  transactions for this address. store these transactions against this address in a database, in MongoDB.

const registerAddress = async (req, res) => {
  try {
    if (!req.body.address || !req.body.transaction)
      return res
        .status(400)
        .send({ msg: "please provide address and transaction" });

    let data = await transactionModel.create(req.body);
    return res.status(201).send({ msg: "successfully added", result: data });
  } catch (err) {
    res.status(500).send({ msg: err});
  }
};

//3. latest price of Ethereum

const ethereum = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`,
    };
    let result = await axios(options);
    let data = result.data;

    let value = data.ethereum.inr;

    let update = {};

    update["ethereum.inr"] = value;

    await coinModel.findOneAndUpdate(
      { _id: "62d91e720bba53c65fbe1b8d" },
      update
    );

    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    res.status(500).send({ msg: err});
  }
};

//04 adding the currency in Mongo DB

const registerCurrency = async (req, res) => {
  try {
    let data = req.body;
    let ans = await coinModel.create(data);
    return res.status(201).send(ans);
  } catch (err) {
    res.status(500).send({ msg: err});
  }
};

//05  fetch the price of Ethereum every 10 everytime

const geteth = async (req, res) => {
  try {
    let result = await coinModel.find();
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};

module.exports = {
  transcation,
  registerAddress,
  ethereum,
  registerCurrency,
  geteth,
};
