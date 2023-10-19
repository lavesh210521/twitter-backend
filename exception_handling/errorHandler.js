import {validationResult } from "express-validator";
import { reportError } from "../config/emailHandler.js";

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

export const globalHandler = async(err,req,res,next) => {
  res.status(500).json({error: "Internal Server Error!"});
  await reportError("Caught by Global Handler",err.location + "\n" + err.stack);
}