import { body, query } from "express-validator";
import { Tweet } from "../../models/Index.js";

export const userTweetValidationRules = [
    query("userId")
        .custom((value,{req}) => {
            console.log(req.query.userId);
            if(!req.query.userId){
                throw new Error("userId required");
            }
            return true;
        })

]