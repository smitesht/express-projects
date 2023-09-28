const { CustomAPIError } = require("./custom-error");

const errorHandlerMiddleware = (err, req, resp, next) => {
  if (err instanceof CustomAPIError) {
    return resp.status(err.statusCode).json({ msg: err.message });
  }

  return resp.status(500).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
