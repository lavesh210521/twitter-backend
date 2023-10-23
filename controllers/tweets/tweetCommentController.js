import { reportError } from "../../config/emailHandler.js";
import * as tweetCommentService from "../../services/tweet/tweetCommentService.js";

export const getComments = async(req,res) => {
    try {
        const comments = await tweetCommentService.getComments(req.query.tweetId);
        res.status(200).json({Comments: comments});
        
    } catch (error) {
        console.log(error);
        reportError("Critical Error in tweetCommentController->getComments()",error);
        res.status(500).json({error: "There is some error while fetching comments!"});
    }
}

export const createComment = async(req,res) => {
    try {
        const comment = await tweetCommentService.createComment(req.userId,req.body.tweet,req.body.commentId)
        res.status(200).json({ tweet: comment });
    } catch (error) {
        console.log(error);
        reportError("Critical Error in tweetCommentController->createComment()",error);
        res.status(404).json({ error: "There is some error while posting comment!" });
    }
}