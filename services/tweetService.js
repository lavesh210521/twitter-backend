import { Model, Op } from "sequelize";
import { Like, Tweet, User } from "../models/Index.js";
import { reportError } from "../config/emailHandler.js";

export const getAllTweets = async (req, res) => {
    try {
        let totalTweetCount = await Tweet.findAndCountAll({
            where: {
                [Op.and]: [
                    { user_id: req.userId },
                    { comment_id: null },
                ]
            }
        });
        const tweets = await Tweet.findAll({
            where: {
                [Op.and]: [
                    { user_id: req.userId },
                    { comment_id: null }
                ]
            },
            limit: Number(req.query.limit),
            offset: Number(req.query.offset),
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
        res.status(200).json({
            tweets: tweets,
            totalTweetCount: totalTweetCount.count
        });

    } catch (error) {
        console.log(error);
        reportError("Critical Error in tweetService->getAllTweets()", error);
        res.status(500).json({ error: "There is some error while fetching tweets" });
    }

}
export const createTweet = async (req, res) => {
    try {
        const [tweet, created] = await Tweet.findOrCreate({
            user_id: req.userId,
            tweet: req.body.tweet,
            image_url: req.body.imageUrl
        });
        res.status(200).json({ tweet: tweet });
    } catch (error) {
        console.log(error);
        reportError("Critical Error in tweetService->createTweet()", error);
        res.status(404).json({ error: "There is some error while posting tweet" });
    }
}
export const getAllTweetFromUserWithLikeAndComment = async (req, res) => {
    try {
        let totalTweetCount = await Tweet.findAndCountAll({
            where: {
                [Op.and]: [
                    { user_id: req.query.userId },
                    { comment_id: null },]
            }
        });
        let tweets = await Tweet.findAll({
            limit: Number(req.query.limit),
            offset: Number(req.query.offset), where: {
                [Op.and]: [
                    { user_id: req.query.userId },
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
        res.status(200).json({ tweets: tweets, totalTweetCount: totalTweetCount.count });
    } catch (error) {
        reportError("Critical Error in tweetService->createTweet()", error);
        res.status(500).json({ error: "There is some error while fetching tweets" });
    }

}
export const deleteTweet = async (req, res) => {
    try {
        await Tweet.destroy({
            where: {
                id: req.query.tweetId
            }
        });
        res.status(200).json({ message: "Tweet Deleted Successfully" });
    } catch (error) {
        reportError("Critical Error in tweetService->deleteTweet()", error);
        res.status(500).json({ error: "There is some error while deleteing tweet!" });
    }
}