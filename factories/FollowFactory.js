import { Follow } from "../models/Index.js";
import { User } from "../models/Index.js";
import { faker } from '@faker-js/faker';


export async function create(count){
    let users = await User.findAll();
    let result = [];
    for(var i = 0;i < count;++i){
        let fake_from_id = faker.helpers.arrayElement(users).id;
        let fake_to_id = (fake_from_id+1) % (users.length-1);
        if(fake_to_id == 0){
            fake_to_id = 1;
        }
        result[i] = await Follow.create({
            from_user_id: fake_from_id,
            to_user_id: fake_to_id
        });
        
    }
    return result;
}
export async function build(count){
    let users = await User.findAll();
    let result = [];
    for(var i = 0;i < count;++i){
        let fake_from_id = faker.helpers.arrayElement(users).id;
        let fake_to_id = (fake_from_id+1) % (users.length-1);
        if(fake_to_id == 0){
            fake_to_id = 1;
        }
        result[i] = await Follow.build({
            from_user_id: fake_from_id,
            to_user_id: fake_to_id
        });
        
    }
    return result;
}
