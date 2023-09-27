import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    console.log("handleValidationCalled!");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
