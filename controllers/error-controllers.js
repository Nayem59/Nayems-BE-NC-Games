exports.error404NoPath = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.customErrors = (err, req, res, next) => {
  if (err === "valid but not existent review_id") {
    res.status(404).send({ msg: err });
  } else if (err === "user does not exist") {
    res.status(404).send({ msg: "user does not exist" });
  } else {
    next(err);
  }
};

exports.errorPSQL400 = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "missing or wrong request keys" });
  } else {
    next(err);
  }
};

exports.error500Status = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "500: Internal Server Error" });
};
