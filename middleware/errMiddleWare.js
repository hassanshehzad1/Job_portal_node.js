const errMiddleWare = (err, req, res, next) => {
  console.error(err);
  const defaultErrors = {
    statusCode: 500,
    message: "Something went wrong",
  };

  if (err.name == "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(".");
  }
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${
      Object.keys(err.keyValue)[0]
    } Field must e unique`;
  }

  res.status(defaultErrors.statusCode).json({
    message: defaultErrors.message,
  });
};

export default errMiddleWare;
