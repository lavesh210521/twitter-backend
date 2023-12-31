import { reportError } from "../../config/emailHandler.js";
import * as userFollowTweetService from "../../services/user/userFollowTweetService.js";
export const getAllTweetsFromFollowings = async (req, res) => {
    try {
        let [tweets,totalTweetCount] = await userFollowTweetService.getAllTweetsFromFollowings(req.userId,req.query.limit,req.query.offset);
        res.status(200).json({ tweets: tweets, totalTweetCount: totalTweetCount });
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowTweetController->getAllTweetsFromFollowings()", error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}