const Joi = require("joi");
module.exports.tourSchema = Joi.object({
  tour: Joi.object({
    title: Joi.string().required(),
    image1: Joi.string().required(),
    image2: Joi.string().required(),
    image3: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    description1: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});
