const db = require("../db/connection");

exports.fetchReviews = () => {
  let queryStr = `
    SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category,
    reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC;
    `;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.fetchReviewById = (review_id) => {
  let queryStr = "SELECT * FROM reviews WHERE review_id = $1";
  const queryParams = [review_id];

  return db.query(queryStr, queryParams).then((result) => {
    if (result.rowCount === 0) {
      return Promise.reject("valid but not existent review_id");
    } else {
      return result.rows[0];
    }
  });
};

exports.fetchReviewComments = (review_id) => {
  let queryStr =
    "SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC";
  const queryParams = [review_id];

  return db.query(queryStr, queryParams).then((result) => {
    return result.rows;
  });
};
