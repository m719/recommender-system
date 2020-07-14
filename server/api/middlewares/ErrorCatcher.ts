const DEFAULT_ERROR_STATUS = 500;

// Logs out errors to the console
export function logErrors(err, req, res, next) {
  if (err.stack) {
    console.error(err.stack);
  }
  next(err);
}

// Logs xhr errors to the client
export function clientErrorHandler(err, req, res, next) {
  const errCpy = err;
  if (req.xhr) {
    if (!errCpy.statusCode) {
      errCpy.statusCode = DEFAULT_ERROR_STATUS;
    }
    return res.status(errCpy.statusCode).send({ message: errCpy.message, description: errCpy.$description });
  }
  return next(errCpy);
}

// Logs all other errors
export function errorHandler(err, req, res, next) {
  if(!err.statusCode) {
    err.statusCode = DEFAULT_ERROR_STATUS;
  }
  return res.status(err.statusCode).send({ message: err.message, description: err.$description });
};

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
};
