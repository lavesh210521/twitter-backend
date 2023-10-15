import { User } from "../../models/Index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isUndefine } from "../../helpers.js";
import { Op } from "sequelize";
import cookieParser from "cookie-parser";
import { sendEmail } from "../../config/emailHandler.js";


export const signup = async (req, res) => {
    try {
        const { first_name, last_name, username, email, password, confirm_password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashedPassword
        });
        const jwtToken = jwt.sign({ email: email, id: newUser.id }, process.env.SECRET);
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate + 7);
        res.cookie(`auth`, jwtToken, {
            expire: expiryDate,
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        });
        return res.status(201).json({ id: newUser.id, token: jwtToken });
    } catch (error) {
        console.log("Generated from AuthController.signUp " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
            const user = await User.findOne({
            where: {
                email: email
            }
        });
        const jwtToken = jwt.sign({ email: email, id: user.id }, process.env.SECRET);
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate + 7);
        res.clearCookie(`auth`, { path: '/' });
        res.cookie(`auth`, jwtToken, {
            expire: expiryDate,
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        });
        sendEmail("auth@twitter.com", user.email, "Logged In", "Your account has been logged in!");
        return res.status(200).json({ id: user.id, token: jwtToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}
export const signout = async (req, res) => {
    res.clearCookie(`auth`, { path: '/' });
    res.status(200).json({ message: "User Signout Successfully!" });
}