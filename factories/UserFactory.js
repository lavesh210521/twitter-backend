import { User } from "../models/Index.js";
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt"

export async function create(count){
    let result = [];
    for(var i = 0;i < count;++i){
        result[i] = await User.create({first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: await bcrypt.hash("password",10)
        });
    }
    return result;
}
export async function build(count){
    let result = [];
    for(var i = 0;i < count;++i){
        result[i] = await User.build({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password:await bcrypt.hash("password",10)
        });
    }
    return result;
}
