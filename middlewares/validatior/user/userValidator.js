import { body,query } from "express-validator";
import { User } from "../../../models/Index.js";

export const userProfileViewValidationRules = [
	query('userId')
		.exists()
		.withMessage("User Id is required!")
		.notEmpty()
		.withMessage("User Id cannot be empty!")
];
export const userSearchValidationRules = [
	query("searchKeyword")
		.exists()
		.withMessage("keywords are required")
		.notEmpty()
		.withMessage("required few characters to search!")
];
export const userExistValidationRules = [
	query("userId")
		.exists()
		.withMessage("User Id is required!")
		.notEmpty()
		.withMessage("User Id cannot be empty")
		.custom(async (value, { req }) => {
			const user = await User.findOne({
				where: {
					id: value
				}
			});
			if (!user) {
				throw new Error();
			}
		})
		.withMessage("User doesn't exist!")
]
export const userUpdateValidationRules = [
	body("first_name")
		.exists()
		.withMessage("first_name is required!")
		.notEmpty()
		.withMessage("first_name cannot be empty"),
	body("last_name")
		.exists()
		.withMessage("last_name is required!")
		.notEmpty()
		.withMessage("last_name cannot be empty!"),
	body("username")
		.exists()
		.withMessage("username is required!")
		.notEmpty()
		.withMessage("username cannot be empty!")
		.custom(async (value, { req }) => {
			const user = await User.findOne({
				where: {
					username: req.body.username
				}
			});
			if (user && user.id != req.userId && user.username == value) {
				throw new Error()
			}
			return true;
		})
		.withMessage("username already exists!"),
	body('email')
		.exists()
		.withMessage("email is required!")
		.notEmpty()
		.withMessage("email cannot be empty!")
		.isEmail()
		.withMessage("Email is not in proper format!")
		.custom(async (value, { req }) => {
			const user = await User.findOne({
				where: {
					email: req.body.email,
				}
			});
			console.log(user);
			if (user && user.id != req.userId && user.email == value) {
				throw new Error();
			}
			return true;
		})
		.withMessage('Email already Exists!')
]