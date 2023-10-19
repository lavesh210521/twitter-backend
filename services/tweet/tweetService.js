import { Model, Op } from "sequelize";
import { Like, Tweet, User } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";

export const getAllTweets = async (userId, limit, offset) => {
    let totalTweetCount = await Tweet.findAndCountAll({
        where: {
            [Op.and]: [
                { user_id: userId },
                { comment_id: null },
            ]
        }
    });
    const tweets = await Tweet.findAll({
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
                model: Tweet, as: "Comment", include: [
                    { model: User }
                ]
            },
            { model: Like }
        ]
    });
    return [tweets, totalTweetCount.count];
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

    let totalTweetCount = await Tweet.findAndCountAll({
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
            { model: User },
            {
                model: Tweet,
                as: "Comment",
                include: [
                    { model: User }
                ]
            },
            { model: Like }
        ]
    });
    return [tweets, totalTweetCount.count];
}
export const deleteTweet = async (tweetId) => {
    await Tweet.destroy({
        where: {
            id: tweetId
        }
    });
}