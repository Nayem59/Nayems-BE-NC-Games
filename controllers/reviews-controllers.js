const {
  fetchReviews,
  fetchReviewById,
  fetchReviewComments,
  addReviewComments,
} = require("../models/reviews-models");
const { fetchUserById } = require("../models/users-models");

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  const checkReviewPromise = fetchReviewById(review_id);
  const fetchReviewCommentsPromise = fetchReviewComments(review_id);

  return Promise.all([fetchReviewCommentsPromise, checkReviewPromise])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  const newComment = req.body;

  fetchReviewById(review_id)
    .then(() => {
      return fetchUserById(newComment.username);
    })
    .then(() => {
      return addReviewComments(review_id, newComment);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
