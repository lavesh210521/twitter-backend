import { User } from "./User.js";
import { Tweet } from "./Tweet.js";
import { Like } from "./Like.js";
import { Follow } from "./Follow.js";

User.hasMany(Tweet,{
    foreignKey: "user_id"
});
User.hasMany(Follow,{
    foreignKey: "to_user_id",
    as: "Follower"
});
User.hasMany(Follow,{
    foreignKey: "from_user_id",
    as: "Following"
});
Tweet.belongsTo(User,{
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Like.belongsTo(User,{
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Like.belongsTo(Tweet,{
    foreignKey: "tweet_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Follow.belongsTo(User,{
    foreignKey: "following_user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Follow.belongsTo(User,{
    foreignKey: "follower_user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

export {User,Tweet,Like,Follow}