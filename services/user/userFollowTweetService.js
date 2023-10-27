import { Op } from "sequelize";
import { Follow, Like, Tweet, User } from "../../models/Index.js";
import { sequelize } from "../../config/connection.js";

// export const getAllTweetsFromFollowings = async (userId, limit, offset) => {

//     const followings = await User.findOne({
//         where: {
//             id: userId
//         },
//         include: [
//             {
//                 model: Follow,
//                 as: "Following",
//                 include: [
//                     {
//                         model: User,
//                         as: "Follower",
//                         attributes: ["id"]
//                     },
//                 ],
//             },
//         ],
//     })
//     if (followings == undefined) {
//         res.status(200).json({ users: {} })
//     }
//     const users = followings.Following.map((value) => {
//         return value.Follower
//     });
//     let ids = [];
//     users.filter((user) => {
//         ids.push(user.id);
//     });
//     let totalTweetCount = await Tweet.findAndCountAll({
//         where: {
//             [Op.and]: [
//                 { user_id: ids },
//                 { comment_id: null },
//             ]
//         }
//     });
//     let tweets = await Tweet.findAll({
//         limit: Number(limit),
//         offset: Number(offset),
//         where: {
//             [Op.and]: [
//                 { user_id: ids },
//                 { comment_id: null },]
//         },
//         include: [
//             { model: User },
//             {
//                 model: Tweet, as: "Comment",
//                 include: [
//                     { model: User }
//                 ]
//             },
//             {
//                 model: Like,
//             }
//         ]
//     });

//     return [tweets, totalTweetCount.count];
// }

//-------------------------------------

export const getAllTweetsFromFollowings = async (userId, limit, offset) => {

    const followings = await User.findOne({
        where: {
            id: userId
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
        return {};
    }
    const users = followings.Following.map((value) => {
        return value.Follower
    });
    let ids = [];
    users.filter((user) => {
        ids.push(user.id);
    });
    let totalTweetCount = await Tweet.count({
        where: {
            [Op.and]: [
                { user_id: ids },
                { comment_id: null },
            ]
        }
    });
    let tweets = await Tweet.findAll({
        limit: Number(limit),
        offset: Number(offset),
        where: {
            [Op.and]: [
                { user_id: ids },
                { comment_id: null },
            ]
        },
        include: [
            { model: User },
            {
                model: Like,
                attributes: [
                    [sequelize.literal('(SELECT COUNT(*) FROM LIKES WHERE LIKES.tweet_id = Tweet.id)'), 'likeCount'],
                    [sequelize.literal('(SELECT COUNT(*) FROM LIKES WHERE LIKES.user_id = ' + userId + ' AND LIKES.tweet_id = Tweet.id)'), 'isLikedByUser']
                ]
            },
            {
                model: Tweet,
                as: "Comment",
                attributes: ["id"]
            }
        ]
    });
    tweets = tweets.map((tweet) => {
        return {
            id: tweet.id,
            tweet: tweet.tweet,
            createdAt: tweet.createdAt,
            User: tweet.User,
            likeCount: tweet.Likes.length,
            isLikedByUser: tweet.Likes.length == 0 ? 0 : tweet.Likes[0].getDataValue("isLikedByUser"),
            commentCount: tweet.Comment.length
        }
    });
    return [tweets, totalTweetCount];
}