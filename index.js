if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

const ExpressError = require("./utils/ExpressError");
const reviews = require("./routes/reviews");
const tours = require("./routes/tours");
const authRoute = require("./routes/auth");

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
app.use(cookie());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  const auth =
    req.cookies?.token == null
      ? false
      : jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.auth = auth;

  next();
});

app.use("/tours", tours);
app.use("/tours/:id/reviews", reviews);
app.use("/", authRoute);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/contact-us", (req, res) => {
  res.render("contact");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No ,Something Went Wrong";
  res.status(statusCode).render("Error", { err });
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
