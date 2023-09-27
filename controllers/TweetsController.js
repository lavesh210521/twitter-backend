import { getAllTweets,getTweetFromId } from "../services/tweetService.js";

export const index = (req,res) => {
    return getAllTweets(req,res);
}
export const findOne = (req,res) => {
    return getTweetFromId(req,res);
}