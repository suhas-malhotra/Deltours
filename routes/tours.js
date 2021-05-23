const express = require("express");

const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const { validateTour } = require("../middleware");
const tours = require("../controllers/tours");
router
  .route("/")
  .get(catchAsync(tours.index))
  .post(validateTour, catchAsync(tours.add));

router.get("/add", catchAsync(tours.seeAdd));

router
  .route("/:id")
  .get(catchAsync(tours.seePlace))
  .put(validateTour, catchAsync(tours.edit))
  .delete(catchAsync(tours.delete));

router.get("/:id/edit", catchAsync(tours.seeEdit));

module.exports = router;
