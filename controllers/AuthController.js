import { User } from "../models/Index.js";
import bcrypt from "bcrypt";
// const jwt = require("jsonwebtoken");
import  jwt  from "jsonwebtoken";
import { isUndefine } from "../helpers.js";
import cookieParser from "cookie-parser";
const SECRET = "MEDIA.NETTOKENS";

export const signup = async(req,res) => {
    try {
        
        const { first_name,last_name,username,email,password,confirm_password} = req.body;
        const data = [first_name,last_name,email,username,password,confirm_password];
        console.log(data);
        console.log(isUndefine(data));
        if(isUndefine(data))
            return res.status(400).json({message: "Missing parameters!"});
        if(password != confirm_password)
        return res.status(400).json({message: "Password and confirm password doesn't match!"});
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({message: "This email id is already in use!!"});
        }
       const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashedPassword
        });
        const jwtToken = jwt.sign({email: email,id: newUser.id},SECRET);
        
        return res.status(201).json({id:newUser.id,token:jwtToken});   
    } catch (error) {
        console.log("Generated from AuthController.signUp " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const signin = async(req,res) => {
    try {
        const {email,password} = req.body;  
        if(email == undefined || password == undefined){
            return res.status(400).json({message: "Missing parameters!"});
        }
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        const isPasswordSame = await bcrypt.compare(password,user.password);
        if(!isPasswordSame){
            return res.status(401).json({message: "Invalid Credentials!"});
        }
        else{
            const jwtToken = jwt.sign({email: email,id: user.id},SECRET);
            let expiryDate = new Date();
            expiryDate.setDate(expiryDate + 7);
            res.cookie(`auth`,jwtToken,{
                expire: expiryDate,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
            return res.status(201).json({id: user.id, token: jwtToken});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong!"});
    }
}
export const signout = async(req,res) => {
    res.clearCookie("auth");    
    res.status(200).json({message: "User Signout Successfully!"});
} 

//"$2b$10$oKroSi4ZgNICbcBwiMNU.OxARdM4F/8gKcAAYYcnYUBopoE3t0bP2"