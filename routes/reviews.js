const express = require("express");
const router = express.Router({ mergeParams: true });

const review = require("../controllers/reviews");
const { validateReview } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.post("/", validateReview, catchAsync(review.add));

router.delete("/:reviewId", catchAsync(review.delete));

module.exports = router;
