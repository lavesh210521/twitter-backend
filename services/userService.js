import { Op } from "sequelize";
import { Follow, User } from "../models/Index.js";

export const getAnyUserProfile = async (req,res) => {
    console.log(new Date());
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId
            },attributes:["id","first_name","last_name","email","username"]
        });
        res.status(200).json({user: user});
    } catch (error) {
        console.log("Error at getAnyUserProfile-userService " + error);
        res.status(500).json({error: "There is some error while getting user!"});
    }
}
export const getUsersBySearch = async(req,res) => {
    try {
        const users = await User.findAll({
            where:{
                username: {
                    [Op.like]: '%'+req.params.searchKeyword+'%'
                }
            },attributes:["id","first_name","last_name","email","username"]
        });
        res.status(200).json({users: users});
    } catch (error) {
        res.status(500).json({error: "There is some error while fetching users"});
        console.log(error);
    }
}
// export const getUserFollowers = async(req,res) => {
//     try {
//         let userId = req.params.userId;
//         const users = await User.findAll({
//             include: "Follower",
//             where: {
//                 id: userId
//             },
//         });
//         res.status(200).json({users: users.Follower});
//     } catch (error) {
//         console.log("Error at getUserFollowers-userService " + error);
//         res.status(500).json({error: "There is some error while getting user's followers"});
//     }
    
// }
// export const getUserFollowings = async(req,res) => {
//     try {
//         let userId = req.params.userId;
//         const users = await User.findOne({
//             include: "Following",
//             where: {
//                 id: userId
//             }
//         });
//         console.log(users);
//         res.status(200).json({id: userId,users: users.Following});
//     } catch (error) {
//         console.log("Error at getUserFollowings-userService " + error);
//         res.status(500).json({message: "Internal Server Error!"});
//     }
    
// }
export const updateUser = async(req,res) => {
    try {
        let userId = req.userId;
        let user = await User.findOne({
            where: {
                id: userId
            },
            attributes:["id","first_name","last_name","email","username"]
        });
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.username = req.body.username;
        user.save();
        res.status(200).json({user: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getUser = async(req,res) => {
    console.log(req.params);
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
        console.log(error);
        res.status(404).json({error: "User not found!"});        
    }
}
export const validateUser = async(req,res) => {
    res.status(200).json({
        status: "verified"
    });
}