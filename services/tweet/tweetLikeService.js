import { reportError } from "../../config/emailHandler.js";
import { Like } from "../../models/Index.js";
import { Op } from "sequelize";

export const tweetLike = async (userId, tweetId) => {
    const [like, created] = await Like.findOrCreate({
        where: {
            user_id: userId,
            tweet_id: tweetId
        }
    });
    return like;
}
export const tweetUnlike = async (userId, tweetId) => {
    await Like.destroy({
        where: {
            [Op.and]: [
                { user_id: userId },
                { tweet_id: tweetId }
            ]
        }
    })
}