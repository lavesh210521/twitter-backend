import { Tweet } from "../models/Index.js";
import { User } from "../models/Index.js";
import { faker } from '@faker-js/faker';


export async function create(count){
    let users = await User.findAll();
    let result = [];
    for(var i = 0;i < count;++i){
        result[i] = await Tweet.create({
            user_id: faker.helpers.arrayElement(users).id,
            tweet: faker.lorem.paragraph()
        });
    }
    return result;
}
export async function build(count){
    let users = await User.findAll();
    let result = [];
    for(var i = 0;i < count;++i){
         result[i] = await User.build({
            user_id: faker.helpers.arrayElement(users).id,
            tweet: faker.lorem.paragraph()
         });
    }
    return result;
}
