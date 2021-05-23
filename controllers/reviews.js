const Tour = require("../models/tour");
const Review = require("../models/review");

module.exports.add = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  const review = new Review(req.body.review);
  tour.reviews.push(review);
  await review.save();
  await tour.save();
  res.redirect(`/tours/${tour._id}`);
};

module.exports.delete = async (req, res) => {
  const { id, reviewId } = req.params;
  await Tour.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/tours/${id}`);
};
