const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.seeRegister = (req, res) => {
  res.render("register");
};

module.exports.register = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    req.flash("error", "Email Already Register");
    return res.redirect("/register");
  }
  const pass = req.body.password;
  const con = req.body.confirm;
  if (pass != con) {
    req.flash("error", "Both Password do not Match");
    return res.redirect("/register");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("token", token);
    res.redirect("/tours");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.seeLogin = (req, res) => {
  res.render("login");
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "Email is not Registered");
    return res.redirect("/login");
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    req.flash("error", "Wrong Password");
    return res.redirect("/login");
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.cookie("token", token);
  res.redirect("/tours");
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
