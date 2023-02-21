exports.error404NoPath = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.customErrors = (err, req, res, next) => {
  if (err === "valid but not existent review_id") {
    res.status(404).send({ msg: err });
  } else {
    next(err);
  }
};

exports.errorPSQL400 = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.error500Status = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "500: Internal Server Error" });
};