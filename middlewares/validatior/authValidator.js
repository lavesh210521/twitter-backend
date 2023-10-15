// validators.js
import { body, validationResult } from "express-validator";
import { User } from "../../models/Index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export const signupValidationRules = [
    body("first_name")
        .exists()
        .withMessage("first_name is required")
        .notEmpty()
        .withMessage("first_name cannot be empty"),
    body("last_name")
        .exists()
        .withMessage("last_name is required")
        .notEmpty()
        .withMessage("last_name cannot be empty!"),
    body("username")
        .exists()
        .withMessage("username is required")
        .notEmpty()
        .withMessage("username cannot be empty!")
        .custom(async (value, { req, res }) => {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });
            if (user && user.username == value) {
                throw new Error("username already exists!");
            }
            return true;
        }),
    body('email')
        .exists()
        .withMessage("email is required")
        .notEmpty()
        .withMessage("email cannot be empty")
        .isEmail()
        .withMessage("Email is not in proper format!")
        .custom(async (value, { req }) => {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                }
            });
            console.log(user);
            if (user && user.email == value) {
                throw new Error()
            }

            return true;
        })

        .withMessage('Email already Exists!'),
    body('password')
        .exists()
        .withMessage("password is required!")
        .notEmpty()
        .withMessage("password cannot be empty!")
        .isLength({ min: 8 })
        .withMessage('Password should be minimum 8 characters long'),
    body('confirm_password')
        .exists()
        .notEmpty()
        .withMessage("confirm_password is required!")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Password and Confirm Password doesn't matches");
            }
            return true;
        })
]

export const signinValidationRules = [
    body('email')
        .exists()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Email cannot be empty"),
    body('password')
        .exists()
        .withMessage("password is required!")
        .isLength({ min: 8 })
        .withMessage('Password should be minimum 8 characters long')
        .custom(async (value, { req }) => {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            console.log(user);
            const isPasswordSame = await bcrypt.compare(req.body.password, user.password);
            console.log(isPasswordSame);
            if (!isPasswordSame) {
                throw new Error();
            }
            return true;
        }).withMessage("Invalid Credentials")
]


