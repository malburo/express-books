const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const bookRouter = require("./routes/book.route");
const userRouter = require("./routes/user.route");
const transactionsRouter = require("./routes/transactions.route");
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route");

const authMiddleware = require("./middlewares/auth.middleware");

const sessionMiddleware = require("./middlewares/session.middleware.js");
var cookieParser = require("cookie-parser");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("ahihi"));

app.use(sessionMiddleware);
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/books", bookRouter);
app.use("/users", authMiddleware.requireAuth, userRouter);
app.use(
  "/transactions",
  authMiddleware.requireAuth,
  transactionsRouter
);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
