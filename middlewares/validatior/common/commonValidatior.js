import {query } from "express-validator";
export const paginateValidationRules = [
    query("limit")
    .exists()
    .withMessage("limit attribute is required!")
    .notEmpty()
    .withMessage("limit cannot be empty!"),

    query("offset")
    .exists()
    .withMessage("offset attribute is required!")
    .notEmpty()
    .withMessage("offset cannot be empty!")
]