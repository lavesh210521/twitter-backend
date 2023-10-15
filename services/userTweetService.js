import { User,Tweet, Like } from "../models/Index.js";
//i think this method is not in use will throw this out once we figure out
export const getAllTweetsFromUser = async(req,res) => {
    try {
        const tweets = await Tweet.findAll({
            include: Like,
            where: {
                user_id: req.query.userId
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