const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const bookRouter = require("./routes/book.route");
const userRouter = require("./routes/user.route");
const transactionsRouter = require("./routes/transactions.route");
const authRouter = require("./routes/auth.route");
const authMiddleware = require("./middlewares/auth.middleware");
const authorMiddleware = require("./middlewares/authorization.middleware");
var cookieParser = require("cookie-parser");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("ahihidongoc"));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/books", authMiddleware.requireAuth, bookRouter);
app.use("/users", authMiddleware.requireAuth, userRouter);
app.use(
  "/transactions",
  authMiddleware.requireAuth,
  authorMiddleware.authorization,
  transactionsRouter
);
app.use("/auth", authRouter);

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
