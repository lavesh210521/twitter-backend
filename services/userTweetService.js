import { User,Tweet, Like } from "../models/Index.js";

export const getAllTweetsFromUser = async(req,res) => {
    try {
        let userId = req.params.userId;
        const tweets = await Tweet.findAll({
            include: Like,
            where: {
                user_id: userId
            }
        });
        res.status(200).json({
            tweets: tweets
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "There is some error while fetching tweets"});
    }
    
}