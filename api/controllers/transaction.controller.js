
const Transaction = require("../../models/transaction.model")

module.exports.getAll = async (req, res) => {
  let transactions = await Transaction.find()
  res.json(transactions)
}
module.exports.getOne = async (req, res) => {
    let transaction = await Transaction.findById(req.params.id)
    res.json(transaction)
  }
module.exports.postCreate = async (req, res) => {
    let transactions = await Transaction.create(req.body);
    res.json(transactions)
}
module.exports.putUpdate = async (req, res) => {
    let transactions = await Transaction.findByIdAndUpdate(req.params.id, req.body);
    res.json(transactions)
}
module.exports.patchUpdateOne = async (req, res) => {
    let transactions = await Transaction.findByIdAndUpdate(req.params.id, req.body);
    res.json(transactions)
}
module.exports.deleteId = async (req, res) => {
    let transactions = await Transaction.findByIdAndRemove(req.params.id);
    res.json(transactions)
}