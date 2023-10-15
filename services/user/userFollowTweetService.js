import { Op } from "sequelize";
import { Follow, Like, Tweet, User } from "../../models/Index.js";

export const getAllTweetsFromFollowings = async (req, res) => {
    try {
        const followings = await User.findOne({
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
                            attributes: ["id"]
                        },
                    ],
                },
            ],
        })
        if (followings == undefined) {
            res.status(200).json({ users: {} })
        }
        const users = followings.Following.map((value) => {
            return value.Follower
        });
        let ids = [];
        users.filter((user) => {
            ids.push(user.id);
        });
        let totalTweetCount = await Tweet.findAndCountAll({
            where: {
                [Op.and]: [
                    { user_id: ids },
                    { comment_id: null },
                ]
            }
        });
        let tweets = await Tweet.findAll({
            limit: Number(req.query.limit),
            offset: Number(req.query.offset),
            where: {
                [Op.and]: [
                    { user_id: ids },
                    { comment_id: null },]
            },
            include: [
                { model: User },
                {
                    model: Tweet, as: "Comment", include: [
                        { model: User }
                    ]
                },
                { model: Like }
            ]
        });

        res.status(200).json({ tweets: tweets, totalTweetCount: totalTweetCount.count });
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowTweetService->getAllTweetsFromFollowings()", error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}