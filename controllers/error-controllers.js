exports.error500Status = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "500: Internal Server Error" });
};
