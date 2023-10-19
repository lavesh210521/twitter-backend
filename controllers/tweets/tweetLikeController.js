import { reportError } from "../../config/emailHandler.js";
import { Like } from "../../models/Index.js";
import { Op } from "sequelize";
import * as tweetLikeService from "../../services/tweet/tweetLikeService.js";

export const tweetLike = async (req, res) => {
    try {
        const like = await tweetLikeService.tweetLike(req.userId,req.body.tweetId);
        res.status(200).json({
            like: like,
        });
    } catch (error) {
        console.log("tweetLikeService -> tweetLike" + error);
        reportError("Critical Error in tweetLikeService->tweetLike()",error);
        res.status(500).json({ error: "There is some issue while performing like operation!" });
    }
}
export const tweetUnlike = async (req, res) => {
    try {
        await tweetLikeService.tweetUnlike(req.userId,req.body.tweetId);
        res.status(200).json({message: "Unliked Successfully!" });
    } catch (error) {
        console.log("tweetLikeService -> tweetUnlike " + error);
        reportError("Critical Error in tweetLikeService->tweetUnlike()",error);
        res.status(500).json({ error: "There is some issue while performing unlike operation!" });
    }

}