import { Tweet } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";

export const getComments = async (tweetId) => {
    const tweet = await Tweet.findOne({
        include: "Comment",
        where: {
            id: tweetId
        }
    });
    return tweet.Comment;
}

export const createComment = async (userId, tweetMsg, commentId) => {
    const tweet = await Tweet.create({
        user_id: userId,
        tweet: tweetMsg,
        comment_id: commentId
    });
    return tweet;
}