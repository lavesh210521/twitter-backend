import { Follow } from "../models/Follow.js";
import { Like } from "../models/Like.js";
import { Tweet } from "../models/Tweet.js";
import { User } from "../models/User.js";
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt"

async function create() {
    const user = await User.create({
        first_name: "lavesh",
        last_name: "ramrakhiani",
        username: "lavesh_21",
        email: "lavesh@gmail.com",
        password: await bcrypt.hash("password", 10)
    });
    for (let i = 1; i <= 10; ++i) {
        await Follow.create({
            from_user_id: user.id,
            to_user_id: i
        });
    }

    for (let i = 1; i <= 10; ++i) {
        await Like.create({
            user_id: user.id,
            tweet_id: i
        });
    }
    for (let i = 1; i <= 10; ++i) {
        await Tweet.create({
            user_id: user.id,
            tweet: faker.lorem.paragraph()
        });
    }
}
await create();