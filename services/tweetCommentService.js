import { json } from "sequelize";
import { Tweet } from "../models/Index.js";

export const getComments = async(req,res) => {
    try {
        const tweet = await Tweet.findOne({
            include: "Comment",
            where: {
                id: req.params.tweetId
            }
        });
        console.log(tweet.id);
        res.status(200).json({Comments: tweet.Comment});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "There is some error while fetching comments!"});
    }
}

export const createComment = async(req,res) => {
    try {
        const tweet = await Tweet.create({
            user_id: req.userId,
            tweet: req.body.tweet,
            image_url: req.body.imageUrl,
            comment_id: req.body.commentId 
        });
        console.log(tweet);
        res.status(200).json({ tweet: tweet });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "There is some error while posting comment!" });
    }
}