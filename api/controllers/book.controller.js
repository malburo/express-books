const Book = require("../../models/book.model");

module.exports.get = async (req, res) => {
  let user = await Book.find();
  res.json(user);
};
