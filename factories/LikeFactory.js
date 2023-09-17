import { Like } from "../models/Index.js";
import { Tweet } from "../models/Index.js";
import { User } from "../models/Index.js";
import { faker } from '@faker-js/faker';

export async function create(count){
    let users = await User.findAll();
    let tweets = await Tweet.findAll();

    count = Math.min(count,users.length);
    let result = [];
    for(var i = 0;i < count-1;++i){
        result[i] = await Like.create({
            user_id: users[i].id,
            tweet_id: faker.helpers.arrayElement(tweets).id
        });
    }
    return result;
}
export async function build(count){
    let users = await User.findAll();
    let tweets = await Tweet.findAll();

    count = Math.min(count,users.length);
    let result = [];
    for(var i = 0;i < count-1;++i){
        result[i] = await Like.build({
            user_id: users[i].id,
            tweet_id: faker.helpers.arrayElement(tweets).id
        });
    }
    return result;
}
