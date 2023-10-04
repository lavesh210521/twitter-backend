import { Op } from "sequelize";
import { User, Follow, Like, Tweet } from "../models/Index.js";

export const follow = async (req, res) => {
    try {
        const follow = await Follow.create({
            from_user_id: req.userId,
            to_user_id: req.body.userId
        });
        res.status(200).json({ message: "Follow Successful" });

    } catch (error) {
        res.status(500).json({
            message: "There is some error while following user"
        });
    }
}

export const unfollow = async (req, res) => {
    try {
        const follow = await Follow.destroy({
            where: {
                from_user_id: req.userId,
                to_user_id: req.body.userId
            }
        });
        res.status(200).json({ message: "Unfollow Successful" });

    } catch (error) {
        res.status(500).json({
            message: "There is some error while unfollowing user"
        });
    }
}

export const getAuthUserFollowings = async (req,res) => {
    try {
        const temp = await User.findOne({
            where: {
                id: req.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Following",
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            attributes:["id","first_name","last_name","email","username"]
                        },
                    ],
                },
            ],
        })
        if(temp == undefined){
            res.status(200).json({ users: {} })
        }
        const users = temp.Following.map((value) => {
            return value.Follower
        });
        res.status(200).json({ users: users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}
export const getAuthUserFollowers = async (req,res) => {
    try {
        const temp = await User.findOne({
            where: {
                id:req.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Follower",
                    include: [
                        {
                            model: User,
                            as: "Following",
                            attributes:["id","first_name","last_name","email","username"]
                        },
                    ],
                },
            ],
        });
        if(temp == undefined){
            res.status(200).json({ users: {} })
        }
        const users = temp.Follower.map((value) => {
            return value.Following
        });
        res.status(200).json({ users: users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There is some error while getting Follower user!" });
    }
}
export const getUserFollowings = async (req, res) => {
    try {
        console.log(req.params.userId);
        const temp = await User.findOne({
            where: {
                id: req.params.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Following",
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            attributes:["id","first_name","last_name","email","username"]
                        },
                    ],
                },
            ],
        })
        if(temp == undefined){
            res.status(200).json({ users: {} })
        }
        const users = temp.Following.map((value) => {
            return value.Follower
        });
        res.status(200).json({ users: users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}
export const removeFollower = async (req,res) => {
    try {
        const follow = await Follow.destroy({
            where: {
                from_user_id: req.body.userId,
                to_user_id: req.userId
            }
        });
        res.status(200).json({ message: "Unfollow Successful" });

    } catch (error) {
        res.status(500).json({
            message: "There is some error while unfollowing user"
        });
    }
}
export const getUserFollowers = async (req, res) => {
    try {   
        const temp = await User.findOne({
            where: {
                id:req.params.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Follower",
                    include: [
                        {
                            model: User,
                            as: "Following",
                            attributes:["id","first_name","last_name","email","username"]
                        },
                    ],
                },
            ],
        });
        if(temp == undefined){
            res.status(200).json({ users: {} })
        }
        const users = temp.Follower.map((value) => {
            return value.Following
        });
        res.status(200).json({ message: users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error while getting Follower user!" });
    }
}
