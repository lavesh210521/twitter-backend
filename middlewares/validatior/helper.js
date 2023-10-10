import { body,validationResult } from "express-validator";
export const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
      // next();
    }
    const errorCode = req.errorCode != undefined ? req.errorCode : 400;
    // console.log("handling error with custom error code" + req.errorCode);
    console.log(errors);
    res.status(errorCode).json({ error: errors.array()[0].msg });
  };
};