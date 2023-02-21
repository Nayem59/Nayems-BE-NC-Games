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
  let queryStr = "SELECT * FROM reviews";
  const queryParams = [];

  if (review_id !== undefined) {
    queryStr += " WHERE review_id = $1";
    queryParams.push(review_id);
  }

  return db.query(queryStr, queryParams).then((result) => {
    if (result.rowCount === 0) {
      return Promise.reject("valid but not existent review_id");
    } else {
      return result.rows[0];
    }
  });
};

exports.fetchReviewComments = (review_id) => {
  let queryStr = "SELECT * FROM comments";
  const queryParams = [];

  if (review_id !== undefined) {
    queryStr += " WHERE review_id = $1 ORDER BY created_at DESC";
    queryParams.push(review_id);
  }

  return db.query(queryStr, queryParams).then((result) => {
    return result.rows;
  });
};

exports.writeReviewComments = (review_id, newComment) => {
  const queryParams = [
    newComment.body,
    newComment.username,
    review_id,
    10,
    new Date(1610964577200),
  ];
  let queryStr = `INSERT INTO comments
  (body, author, review_id, votes, created_at)
  VALUES
  ($1,$2,$3,$4,$5)
  RETURNING *;`;

  return db.query(queryStr, queryParams).then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  });
};
