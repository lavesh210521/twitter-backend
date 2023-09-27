export const getAllTweetsFromFollowings = async(req,res) => {
    try {
        const follow = await Follow.findByPk(1, {
            include: "Following"
        });    
        const temp = await User.findByPk(1, {
            include: [
                {
                    model: Follow,
                    as: "Following",
                    include: [
                        {
                            model: User,
                            as: "Follower",
                            include: [{
                                model: Tweet
                            }
                            ]
                        },
                    ],
                },
            ],
        })
        console.log(temp);
        res.status(200).json({ message: temp })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error while getting Following user!" });
    }
}