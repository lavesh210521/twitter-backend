import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    console.log("handleValidationCalled!");
  const errors = validationResult(req);
  const errorCode = req.errorCode != undefined ? req.errorCode : 400;
  if (!errors.isEmpty()) {
    return res.status(errorCode).json({ errors: errors.array() });
  }
  next();
};
