import { Model, Op } from "sequelize";
import { Like, Tweet, User } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";
import * as tweetService from "../../services/tweet/tweetService.js";

export const getAllTweets = async (req, res) => {
    try {
        const [tweets,totalTweetCount] = await tweetService.getAllTweets(req.userId,req.query.limit,req.query.offset);
        res.status(200).json({
            tweets: tweets,
            totalTweetCount: totalTweetCount
        });

    } catch (error) {
        console.log(error);
        reportError("Critical Error in tweetService->getAllTweets()", error);
        res.status(500).json({ error: "There is some error while fetching tweets" });
    }

}
export const createTweet = async (req, res) => {
    try {
        const tweet = await tweetService.createTweet(req.userId,req.body.tweet,req.body.imageUrl);
        res.status(200).json({ tweet: tweet });
    } catch (error) {
        console.log(error);
        await reportError("Critical Error in tweetService->createTweet()", error.stack);
        res.status(500).json({ error: "There is some error while posting tweet" });
    }
}
export const getAllTweetFromUserWithLikeAndComment = async (req, res) => {
    try {
        const [tweets,totalTweetCount] = await tweetService.getAllTweetFromUserWithLikeAndComment(req.query.userId,req.query.limit,req.query.offset);
        res.status(200).json({ tweets: tweets, totalTweetCount: totalTweetCount });
    } catch (error) {
        reportError("Critical Error in tweetService->createTweet()", error);
        res.status(500).json({ error: "There is some error while fetching tweets" });
    }

}
export const deleteTweet = async (req, res) => {
    try {
        await tweetService.deleteTweet(req.query.tweetId);
        res.status(200).json({ message: "Tweet Deleted Successfully" });
    } catch (error) {
        reportError("Critical Error in tweetService->deleteTweet()", error);
        res.status(500).json({ error: "There is some error while deleteing tweet!" });
    }
}