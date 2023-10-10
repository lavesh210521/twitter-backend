import { body, param } from "express-validator";
import { User } from "../../models/Index.js";


export const validateInputs = () => {
	return [
		body('first_name')
			.exists()
			.notEmpty()
			.withMessage("first_name is required!")
			.escape(),
		body('last_name')
			.exists()
			.notEmpty()
			.withMessage("last_name is required!")
			.escape(),
		body('email')
			.isEmail()
			.escape()
			.withMessage('Please provide a valid email address'),
	];
};
export const userProfileViewValidationRules = [
	param('userId')
	.exists()
	.notEmpty()
	.withMessage("UserId is required!")
];
export const userSearchValidationRules = [
    param("searchKeyword")
    .exists()
    .notEmpty()
    .withMessage("required few characters to search!")
];
export const userExistValidationRules = [
	param("userId")
	.exists()
	.notEmpty()
	.withMessage("user id is required")
	.custom(async (value,{req}) => {
		const user = await User.findOne({
			where: {
				id: value
			}
		});
		if(!user){
			throw new Error();
		}
	})
	.withMessage("User doesn't exist!")
	
]
export const userUpdateValidationRules = [
	body("first_name")
		.exists()
		.notEmpty()
		.withMessage("first_name is required!"),
	body("last_name")
		.exists()
		.notEmpty()
		.withMessage("last_name is required!"),
	body("username")
		.exists()
		.notEmpty()
		.withMessage("username is required!")
		.custom(async (value, { req }) => {
			const user = await User.findOne({
				where: {
					username: req.body.username
				}
			});
			console.log("printing user " + user);
			if (user && user.id != req.userId && user.username == value) {
				throw new Error()
			}
			return true;
		})
		.withMessage("username already exists!"),
	body('email')
		.exists()
		.notEmpty()
		.withMessage("email is required!")
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


