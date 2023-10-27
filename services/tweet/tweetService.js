import { Model, Op } from "sequelize";
import { Like, Tweet, User } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";
import { sequelize } from "../../config/connection.js";

// export const getAllTweets = async (userId, limit, offset) => {
//     let totalTweetCount = await Tweet.count({
//         where: {
//             [Op.and]: [
//                 { user_id: userId },
//                 { comment_id: null },
//             ]
//         }
//     });
//     const tweets = await Tweet.findAll({
//         where: {
//             [Op.and]: [
//                 { user_id: userId },
//                 { comment_id: null }
//             ]
//         },
//         limit: Number(limit),
//         offset: Number(offset),
//         include: [
//             { model: User },
//             {
//                 model: Tweet, as: "Comment", include: [
//                     { model: User }
//                 ]
//             },
//             { model: Like }
//         ]
//     });
//     return [tweets, totalTweetCount];
// }

export const getAllTweets = async (userId, limit, offset) => {
    let totalTweetCount = await Tweet.count({
        where: {
            [Op.and]: [
                { user_id: userId },
                { comment_id: null },
            ]
        }
    });
    let tweets = await Tweet.findAll({
        where: {
            [Op.and]: [
                { user_id: userId },
                { comment_id: null }
            ]
        },
        limit: Number(limit),
        offset: Number(offset),
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
export const createTweet = async (userId, tweetText, imageUrl) => {
    const tweet = await Tweet.create({
        user_id: userId,
        tweet: tweetText,
        image_url: imageUrl
    });
    return tweet;
}
export const getAllTweetFromUserWithLikeAndComment = async (userId,limit,offset) => {

    let totalTweetCount = await Tweet.count({
        where: {
            [Op.and]: [
                { user_id: userId },
                { comment_id: null },]
        }
    });
    let tweets = await Tweet.findAll({
        limit: Number(limit),
        offset: Number(offset),
        where: {
            [Op.and]: [
                { user_id: userId },
                { comment_id: null },]
        },
        include: [
            {model: User},
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
export const deleteTweet = async (tweetId) => {
    await Tweet.destroy({
        where: {
            id: tweetId
        }
    });
}