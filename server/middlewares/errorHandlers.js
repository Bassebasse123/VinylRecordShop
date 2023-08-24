import createError from "http-errors";
import mongoose from "mongoose";

export const duplicateFieldsHandler = (keyValue) => {
  const field = Object.keys(keyValue)[0];
  return createError(`${field} is already exist`);
};

export const isValidId = (req) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw createError("The provided ID is invalid.");
};

export const resourceNotFound = (resource, document, action) => {
  if (!resource)
    throw createError(
      404,
      `Sorry, the ${document} you are trying to ${action} doesn't seem to exist.`
    );
};

export const authError = (statusCode, message) => {
  throw createError(statusCode, message);
};

export const routeNotFound = (req, res, next) => {
  const newError = createError(404, "Resource not found");
  next(newError);
};

export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.statusCode,
    type:
      err.status === 500
        ? "server error"
        : err.stack.split(":")[0].replace(/([a-z])([A-Z])/g, "$1 $2"),
    message: err.message,
    stack: err.stack,
  });
};
