const Tour = require("../models/tour");

module.exports.index = async (req, res) => {
  const tours = await Tour.find({});
  res.render("places", { tours });
};

module.exports.seeAdd = async (req, res) => {
  res.render("add");
};

module.exports.add = async (req, res) => {
  const tour = new Tour(req.body.tour);

  await tour.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/tours/${tour._id}`);
};

module.exports.seePlace = async (req, res) => {
  const tour = await Tour.findById(req.params.id).populate("reviews");
  if (!tour) {
    req.flash("error", "Cannot find that Tourist Destination!");
    return res.redirect("/tours");
  }
  res.render("place", { tour });
};

module.exports.seeEdit = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    req.flash("error", "Cannot find that Tourist Destination!");
    return res.redirect("/tours");
  }
  res.render("edit", { tour });
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndUpdate(id, { ...req.body.tour });
  req.flash("success", "Successfully updated Tourist Desination!");
  res.redirect(`/tours/${tour._id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Tour.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Tourist Desination");
  res.redirect("/tours");
};
