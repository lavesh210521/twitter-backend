import { Op } from "sequelize";
import { Follow, User } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";

export const getAnyUserProfile = async (req,res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.userId
            },attributes:["id","first_name","last_name","email","username"]
        });
        res.status(200).json({user: user});
    } catch (error) {
        console.log("Error at getAnyUserProfile-userService " + error);
        reportError("Critical Error in userService->getAnyUserProfile()",error);
        res.status(500).json({error: "There is some error while getting user!"});
    }
}
export const getUsersBySearch = async(req,res) => {
    try {
        const users = await User.findAll({
            where:{
                username: {
                    [Op.like]: '%'+req.query.searchKeyword+'%'
                }
            },attributes:["id","first_name","last_name","email","username"]
        });
        res.status(200).json({users: users});
    } catch (error) {
        reportError("Critical Error in userService->getUsersBySearch()", error);
        res.status(500).json({error: "There is some error while fetching users"});
    }
}
export const updateUser = async(req,res) => {
    try {
        let userId = req.userId;
        let user = await User.findOne({
            where: {
                id: userId
            },
            attributes:["id","first_name","last_name","email","username"]
        });
        if(!user){
            res.status(404).json({error: "User doesn't exist!"});
        }
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.username = req.body.username;
        user.save();
        res.status(200).json({user: user});
    } catch (error) {
        reportError("Critical Error in userService->updateUser()", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getUser = async(req,res) => {
    console.log(req.query);
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            },attributes:["id","first_name","last_name","email","username"]
        });
        return res.status(200).json({
            user: user
        })
        
    } catch (error) {
        reportError("Critical Error in userService->getUser()", error);
        res.status(404).json({error: "User not found!"});        
    }
}
export const validateUser = async(req,res) => {
    res.status(200).json({
        status: "verified"
    });
}