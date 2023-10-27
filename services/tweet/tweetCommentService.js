import { Tweet, User } from "../../models/Index.js";

export const getComments = async (tweetId) => {
    const comments = await Tweet.findAll({
        where: {
            comment_id: tweetId
        },
        include:[
            {
                model : User,
                attributes: ["id","first_name","last_name","username","email"]
            }
        ]
    });
    return comments;
}

export const createComment = async (userId, tweetMsg, commentId) => {
    const tweet = await Tweet.create({
        user_id: userId,
        tweet: tweetMsg,
        comment_id: commentId
    });
    return tweet;
}