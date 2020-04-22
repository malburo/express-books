const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const bookRouter = require("./routes/book.route");
const userRouter = require("./routes/user.route");
const transactionsRouter = require("./routes/transactions.route");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionsRouter);

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
