import {validationResult } from "express-validator";
export const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
      console.log(result);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ error: errors.array()[0].msg });
  };
};