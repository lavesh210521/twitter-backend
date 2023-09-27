import { body, param } from "express-validator";
import { User } from "../../models/Index.js";


export const validateInputs = () => {
	return [
		body('first_name')
			.exists()
			.escape(),
		body('last_name')
			.exists()
			.escape(),
		body('email')
			.isEmail()
			.escape()
			.withMessage('Please provide a valid email address'),
	];
};
export const userProfileViewValidationRules = [
	param('userId')
	.custom((value) => {
		console.log(value);
		return true;
	})

];
export const userUpdateValidationRules = [
	body("first_name")
		.exists(),
	body("last_name")
		.exists(),
	body("username")
		.exists()
		.custom(async (value, { req }) => {
			const user = await User.findOne({
				where: {
					username: req.body.username
				}
			});
			console.log()
			console.log("printing user " + user);
			if (user && user.id != req.userId && user.username == value) {
				throw new Error()
			}
			return true;
		})
		.withMessage("username already exists!"),
	body('email')
		.exists()
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


