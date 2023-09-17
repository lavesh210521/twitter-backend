import { User } from "./User.js";
import { Tweet } from "./Tweet.js";
import { Follow } from "./Follow.js";
import { Like } from "./Like.js";

await User.sync();
console.log("-----------------------------------------")
console.log("Migrated User");
console.log("-----------------------------------------")
await Tweet.sync();
console.log("-----------------------------------------")
console.log("Migrated Tweet");
console.log("-----------------------------------------")
await Like.sync();
console.log("-----------------------------------------")
console.log("Migrated Like");
console.log("-----------------------------------------")
await Follow.sync();



import {create as createUser,build as buildUser} from "../factories/UserFactory.js";
import{ create as createTweet, build as buildTweet} from "../factories/TweetFactory.js";
import{create as createFollow, build as buildFollow} from "../factories/FollowFactory.js";
import{create as createLike, build as buildLike} from "../factories/LikeFactory.js";


await createUser(50);
console.log("-----------------------------------------")
console.log("User Seeding Successful");
console.log("-----------------------------------------")
await createTweet(150);
await createLike(300);
await createFollow(50);
