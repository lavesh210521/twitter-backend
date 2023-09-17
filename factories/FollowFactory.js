import { Follow } from "../models/Index.js";
import { User } from "../models/Index.js";
import { faker } from '@faker-js/faker';


export async function create(count){
    let users = await User.findAll();
    let result = [];
    for(var i = 0;i < count;++i){
        let fake_following_id = faker.helpers.arrayElement(users).id;
        let fake_follower_id = (fake_following_id+1) % (users.length-1);
        if(fake_follower_id == 0){
            fake_follower_id = 1;
        }
        result[i] = await Follow.create({
            following_user_id: fake_following_id,
            follower_user_id: fake_follower_id
        });
        
    }
    return result;
}
export async function build(count){
    let users = await User.findAll();
    let result = [];
    for(var i = 0;i < count;++i){
        let fake_following_id = faker.helpers.arrayElement(users).id;
        let fake_follower_id = (fake_following_id+1) % (users.length-1);
        if(fake_follower_id == 0){
            fake_follower_id = 1;
        }
        result[i] = await Follow.build({
            following_user_id: fake_following_id,
            follower_user_id: fake_follower_id
        });
    }
    return result;
}
