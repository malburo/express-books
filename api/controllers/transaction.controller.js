
const Transaction = require("../../models/transaction.model")

module.exports.index = async (req, res) => {
  let transactions = await Transaction.find()
  res.json(transactions)
}