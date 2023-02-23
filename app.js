const express = require("express");
const app = express();
app.use(express.json());

const { getApi } = require("./controllers/api-controllers");
const { getCategories } = require("./controllers/categories-controllers");
const {
  getReviews,
  getReviewById,
  getReviewComments,
  postReviewComments,
  patchReview,
} = require("./controllers/reviews-controllers");
const { getUsers } = require("./controllers/users-controllers");
const { deleteCommentById } = require("./controllers/comments-controllers");
const {
  error500Status,
  customErrors,
  errorPSQL,
  error404NoPath,
} = require("./controllers/error-controllers");

app.get("/api", getApi);
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getReviewComments);
app.post("/api/reviews/:review_id/comments", postReviewComments);
app.patch("/api/reviews/:review_id", patchReview);
app.get("/api/users", getUsers);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.use(error404NoPath);
app.use(errorPSQL);
app.use(customErrors);
app.use(error500Status);

module.exports = app;
