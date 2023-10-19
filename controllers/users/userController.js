import { Op } from "sequelize";
import { Follow, User } from "../../models/Index.js";
import { reportError, sendEmail } from "../../config/emailHandler.js";
import * as userService from "../../services/user/userService.js"

export const getAnyUserProfile = async (req, res, next) => {
    try {
        const user = await userService.getAnyUserProfile(req.query.userId);
        res.status(200).json({ user: user });
    } catch (error) {
        // error.location = "userService->getAnyUserProfile()";
        next(error);
    }
}
export const getUsersBySearch = async (req, res) => {
    try {
        console.log(req.query.searchKeyword);
        const users = await userService.getUsersBySearch(req.query.searchKeyword);
        res.status(200).json({ users: users });
    } catch (error) {
        reportError("Critical Error in userService->getUsersBySearch()", error);
        res.status(500).json({ error: "There is some error while fetching users" });
    }
}
export const updateUser = async (req, res) => {
    try {
        let user;
        user.id = req.userId;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.username = req.body.username;
        user = await userService.updateUser(user);
        res.status(200).json({ user: user });
    } catch (error) {
        reportError("Critical Error in userService->updateUser()", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userService.getAnyUserProfile(req.userId);
        res.status(200).json({
            user: user
        });
    } catch (error) {
        reportError("Critical Error in userService->getUser()", error);
        res.status(404).json({ error: "User not found!" });
    }
}
export const validateUser = async (req, res) => {
    res.status(200).json({
        status: "verified"
    }); 
}