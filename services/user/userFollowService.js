import { Op } from "sequelize";
import { User, Follow, Like, Tweet } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";

export const follow = async (from_user_id, to_user_id) => {
    await Follow.findOrCreate({
        where: {
            from_user_id: from_user_id,
            to_user_id: to_user_id
        }
    });
}

export const unfollow = async (from_user_id, to_user_id) => {
    await Follow.destroy({
        where: {
            from_user_id: from_user_id,
            to_user_id: to_user_id
        }
    });
}

export const getUserFollowings = async (userId, limit, offset) => {
    const totalFollowingCount = await User.count({
        where: {
            id: userId
        },
        include: [
            {
                model: Follow,
                as: "Following",
                required: true
            }
        ]
    })
    const user = await User.findOne({
        where: {
            id: userId
        },
        include: [
            {
                model: Follow,
                as: "Following",
                limit: Number(limit),
                offset: Number(offset),
                include: [
                    {
                        model: User,
                        as: "Follower",
                        attributes: ["id", "first_name", "last_name", "email", "username"],
                    },
                ],
            },
        ],
    });
    if (user == undefined) {
        return [{}, 0];
    }
    const users = user.Following.map((value) => {
        return value.Follower
    });
    return [users, totalFollowingCount];
}
export const getUserFollowers = async (userId, limit, offset) => {
    const totalFollowerCount = await User.count({
        where: {
            id: userId
        },
        include: [
            {
                model: Follow,
                as: "Follower",
                required: true
            }
        ]
    })
    const user = await User.findOne({
        where: {
            id: userId
        },
        include: [
            {
                model: Follow,
                as: "Follower",
                limit: Number(limit),
                offset: Number(offset),
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
        return [{}, 0];
    }
    const users = user.Follower.map((value) => {
        return value.Following
    });
    return [users, totalFollowerCount]
}
export const getUserWithFollow = async (userId) => {

    let users = await User.findOne({
        where: {
            id: userId
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
    return [users, followings, followers];
}
export const removeFollower = async (from_user_id, to_user_id) => {
    await Follow.destroy({
        where: {
            from_user_id: from_user_id,
            to_user_id: to_user_id
        }
    });
}


