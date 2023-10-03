import { Follow, Tweet, User } from "../models/Index.js";

export const getAllTweetsFromFollowings = async(req,res) => {
    try {
        const follow = await Follow.findByPk(1, {
            include: "Following"
        });    
        const user = await User.findOne({
            include: [
                {
                    model: Follow,
                    as: "Following",
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            include: [{
                                model: Tweet,
                                attributes:["tweet","image_url","createdAt","comment_id"]
                            }
                            ]
                        },
                    ],
                },
            ],
            where: {
                id: req.userId
            }
        });
        const tweets = user.Following.map((value) => {
             return (value.Follower.Tweets.map((tweet) => {
                return tweet;
            }));
        });
        // const tweets =
        res.status(200).json({ tweets: tweets });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "There is some error while getting Following user!" });
    }
}