import { Op } from "sequelize";
import { User, Follow, Like, Tweet } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";

export const follow = async (req, res) => {
    try {
        const [follow, created] = await Follow.findOrCreate({
            where: {
                from_user_id: req.userId,
                to_user_id: req.body.userId
            }
        });
        res.status(200).json({ message: "Follow Successful" });

    } catch (error) {
        reportError("Critical Error in userFollowService->follow()", error);
        res.status(500).json({ error: "There is some error while following user" });
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
        reportError("Critical Error in tweetService->deleteTweet()", error);
        res.status(500).json({ error: "There is some error while unfollowing user" });

    }
}

export const getAuthUserFollowings = async (req, res) => {
    try {
        const totalFollowingCount = await User.findAndCountAll({
            where: {
                id: req.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Following",
                }
            ]
        })
        const user = await User.findOne({
            where: {
                id: req.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Following",
                    limit: Number(req.query.limit),
                    offset: Number(req.query.offset),
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            attributes: ["id", "first_name", "last_name", "email", "username"],
                        },
                    ],
                },
            ],
        })
        if (user == undefined) {
            res.status(200).json({ users: {} })
        }
        const users = user.Following.map((value) => {
            return value.Follower
        });
        res.status(200).json({ users: users, totalFollowingCount: totalFollowingCount })
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->follow()", error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}
export const getAuthUserFollowers = async (req, res) => {
    try {
        const totalFollowerCount = await User.findAndCountAll({
            where: {
                id: req.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Follower",
                }
            ]
        })
        const user = await User.findOne({
            where: {
                id: req.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Follower",
                    limit: Number(req.query.limit),
                    offset: Number(req.query.offset),
                    include: [
                        {
                            model: User,
                            as: "Following",
                            attributes: ["id", "first_name", "last_name", "email", "username"]
                        },
                    ],
                },
            ],
        });
        if (user == undefined) {
            res.status(200).json({ users: {} })
        }
        const users = user.Follower.map((value) => {
            return value.Following
        });
        res.status(200).json({ users: users, totalFollowerCount: totalFollowerCount })
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->getAuthUserFollowers()", error);
        res.status(500).json({ error: "There is some error while getting Follower user!" });
    }
}
export const getUserFollowings = async (req, res) => {
    try {
        console.log(req.query.userId);
        const user = await User.findOne({
            where: {
                id: req.query.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Following",
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            attributes: ["id", "first_name", "last_name", "email", "username"]
                        },
                    ],
                },
            ],
        })
        if (user == undefined) {
            res.status(200).json({ users: {} })
        }
        const users = user.Following.map((value) => {
            return value.Follower
        });
        res.status(200).json({ users: users })
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->getUserFollowings()", error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}
export const getUserWithFollow = async (req, res) => {
    try {
        let users = await User.findOne({
            where: {
                id: req.query.userId
            }, attributes: ["id", "first_name", "last_name", "email", "username"],
            include: [
                {
                    model: Follow,
                    as: "Following",
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            attributes: ["id", "first_name", "last_name", "email", "username"]
                        }
                    ],
                },
                {
                    model: Follow,
                    as: "Follower",
                    include: [
                        {
                            model: User,
                            as: "Following",
                            attributes: ["id", "first_name", "last_name", "email", "username"],
                        },
                    ],
                },
            ],
        })
        let followers = users["Follower"].map((value) => {
            return value.Following;
        });
        let followings = users["Following"].map((value) => {
            return value.Follower;
        });
        res.status(200).json({ user: users, followers: followers, followings: followings });
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->getUserWithFollow()", error);
        res.status(500).json({ error: "There is some error while fetching user and follow" })
    }
}
export const removeFollower = async (req, res) => {
    try {
        const follow = await Follow.destroy({
            where: {
                from_user_id: req.body.userId,
                to_user_id: req.userId
            }
        });
        res.status(200).json({ message: "Unfollow Successful" });

    } catch (error) {
        reportError("Critical Error in userFollowService->removeFollower()", error);
        res.status(500).json({ message: "There is some error while unfollowing user" });
    }
}

export const getUserFollowers = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.userId
            },
            include: [
                {
                    model: Follow,
                    as: "Follower",
                    include: [
                        {
                            model: User,
                            as: "Following",
                            attributes: ["id", "first_name", "last_name", "email", "username"]
                        },
                    ],
                },
            ],
        });
        if (user == undefined) {
            res.status(200).json({ users: {} })
        }
        const users = user.Follower.map((value) => {
            return value.Following
        });
        res.status(200).json({ users: users })
    } catch (error) {
        reportError("Critical Error in userFollowService->getUserFollowers()", error);
        res.status(500).json({ error: "There is some error while getting Follower user!" });
    }
}
