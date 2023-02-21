const express = require("express");
const app = express();
// app.use(express.json());
const { getCategories } = require("./controllers/categories-controllers");
const { getReviews, getReviewById } = require("./controllers/reviews-controllers");
const { error500Status } = require("./controllers/error-controllers");

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);

app.use(error500Status);

module.exports = app;
