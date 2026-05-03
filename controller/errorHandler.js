const errorHandler = (err, res, res, next) => {
  res.status(500).send({
    message: err.message,
  });
};
module.exports = errorHandler;
