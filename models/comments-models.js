const db = require("../db/connection");

exports.removeCommentById = (comment_id) => {
  let queryStr = "DELETE FROM comments WHERE comment_id = $1 RETURNING *";
  const queryParams = [comment_id];

  return db.query(queryStr, queryParams).then((result) => {
    if (result.rowCount === 0) {
      return Promise.reject("comment not existent");
    }
    return result.rowCount;
  });
};
