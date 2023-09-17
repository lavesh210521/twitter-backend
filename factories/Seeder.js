
import {create as createUser,build as buildUser} from "../factories/UserFactory.js";
import{ create as createTweet, build as buildTweet} from "../factories/TweetFactory.js";
import{create as createFollow, build as buildFollow} from "../factories/FollowFactory.js";
import{create as createLike, build as buildLike} from "../factories/LikeFactory.js";
import { User } from "../models/User.js";


await createUser(50);
await createTweet(150);
await createLike(300);
await createFollow(50);

// User.create({
//     first_name: "Lavesh",
//     last_name: "Ramrakhiani",
//     email: "lavesh@gmail.com",
//     username: "lavesh_21",
//     password: "lavesh_21"
// });

