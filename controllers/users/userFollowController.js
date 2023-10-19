import { Op } from "sequelize";
import { User, Follow, Like, Tweet } from "../../models/Index.js";
import { reportError } from "../../config/emailHandler.js";
import * as userFollowService from "../../services/user/userFollowService.js";

export const follow = async (req, res) => {
    try {
        await userFollowService.follow(req.userId,req.body.userId);
        res.status(200).json({ message: "Follow Successful" });

    } catch (error) {
        reportError("Critical Error in userFollowService->follow()", error);
        res.status(500).json({ error: "There is some error while following user" });
    }
}

export const unfollow = async (req, res) => {
    try {
        await userFollowService.unfollow(req.userId,req.body.userId);
        res.status(200).json({ message: "Unfollow Successful" });
    } catch (error) {
        reportError("Critical Error in tweetService->deleteTweet()", error);
        res.status(500).json({ error: "There is some error while unfollowing user" });

    }
}

export const getAuthUserFollowings = async (req, res) => {
    try {
        const [users,totalFollowingCount] = await userFollowService.getUserFollowings(req.userId,req.query.limit,req.query.offset);
        res.status(200).json({ users: users, totalFollowingCount: totalFollowingCount })
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->follow()", error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}
export const getAuthUserFollowers = async (req, res) => {
    try {
       const [users,totalFollowerCount] = await userFollowService.getUserFollowers(req.userId,req.query.limit,req.query.offset);
        res.status(200).json({ users: users, totalFollowerCount: totalFollowerCount })
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->getAuthUserFollowers()", error);
        res.status(500).json({ error: "There is some error while getting Follower user!" });
    }
}
export const getUserFollowings = async (req, res) => {
    try {
        const [users,totalFollowingCount] = await userFollowService.getUserFollowings(req.query.userId,req.query.limit,req.query.offset);
        res.status(200).json({ users: users, totalFollowingCount: totalFollowingCount })
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->follow()", error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}
export const getUserFollowers = async (req, res) => {
    try {
        const [users,totalFollowerCount] = await userFollowService.getUserFollowers(req.query.userId,req.query.limit,req.query.offset);
         res.status(200).json({ users: users, totalFollowerCount: totalFollowerCount })
     } catch (error) {
         console.log(error);
         reportError("Critical Error in userFollowService->getAuthUserFollowers()", error);
         res.status(500).json({ error: "There is some error while getting Follower user!" });
     } 
}
export const getUserWithFollow = async (req, res) => {
    try {
        const [users,followings,followers] = await userFollowService.getUserWithFollow(req.query.userId);
        res.status(200).json({ user: users, followers: followers, followings: followings });
    } catch (error) {
        console.log(error);
        reportError("Critical Error in userFollowService->getUserWithFollow()", error);
        res.status(500).json({ error: "There is some error while fetching user and follow" })
    }
}
export const removeFollower = async (req, res) => {
    try {
        await userFollowService.removeFollower(req.body.userId,req.userId);
        res.status(200).json({ message: "Unfollow Successful" });

    } catch (error) {
        reportError("Critical Error in userFollowService->removeFollower()", error);
        res.status(500).json({ message: "There is some error while unfollowing user" });
    }
}

