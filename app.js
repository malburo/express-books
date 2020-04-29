require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected")
});
mongoose.set('useFindAndModify', false);

const bookRouter = require("./routes/book.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route");
const shopRouter = require("./routes/shop.route");
const transactionsRouter = require("./routes/transactions.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware.js");

// api
const apiTransactions = require("./api/routes/transaction.route")
const apiLogin = require("./api/routes/auth.route")
var cookieParser = require("cookie-parser");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware);
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use(
  "/transactions",
  authMiddleware.requireAuth,
  transactionsRouter
);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/shop", shopRouter);


app.use("/api/transactions", apiTransactions)
app.use("/api/login", apiLogin)

app.use(function (err, req, res, next) {
  res.status(500)
  let errors = [];
  errors.push(err)
  res.render('errors', { errors: errors })
})

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
