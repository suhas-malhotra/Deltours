const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
  title: String,
  description: String,
  description1: String,
  image1: String,
  image2: String,
  image3: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

TourSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Tour", TourSchema);
