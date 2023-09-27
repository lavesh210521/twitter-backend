import { body, param, query } from "express-validator";
import { Tweet } from "../../models/Index.js";

export const userTweetValidationRules = [
    param("userId")
        .custom((value,{req}) => {
            console.log(req.params.userId);
            if(!req.params.userId){
                throw new Error("userId required");
            }
            return true;
        })

]