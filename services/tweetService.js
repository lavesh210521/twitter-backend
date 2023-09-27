import { Tweet, User } from "../models/Index.js";

export const getAllTweets = async (req, res) => {
    try {
        let userId = req.userId;
        const tweets = await Tweet.findAll({
            where: {
                user_id: userId
            }
        });
        res.status(200).json({
            tweets: tweets
        });
        
    } catch (error) {
        res.status(500).json({message: "There is some error while fetching tweets"});
    }
    
}

export const getTweetFromId = async (req, res) => {
    const tweet = await Tweet.findOne({
        where: {
            id: req.params.tweetId
        }
    });
    if (tweet == undefined) {
        return res.status(404).json({
            message: "Tweet doesn't exist!"
        });
    }
    return res.status(200).json({
        tweet: tweet
    });
}
export const getAllTweetsFromFollowing = async (req, res) => {
    let users = await User.findAll()
}

export const createTweet = async (req, res) => {
    try {
        const tweet = await Tweet.create({
            user_id: req.userId,
            tweet: req.body.tweet,
            image_url: req.body.imageUrl
        });
        res.status(200).json({ tweet: tweet });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "There is some error while posting tweet" });
    }


}

export const deleteTweet = async (req, res) => {
    try {
        await Tweet.destroy({
            where: {
                id: req.params.tweetId
            }
        });
        res.status(200).json({ message: "Tweet Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error while deleteing tweet!" });
    }

}