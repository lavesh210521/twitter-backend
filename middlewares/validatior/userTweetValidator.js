import { body, param, query } from "express-validator";
import { Tweet } from "../../models/Index.js";

export const userTweetValidationRules = [
    param("userId")
        .custom((value,{req}) => {
            console.log(req.params.userId);
            if(!req.params.userId){
                const error = new Error("userId required");
                error.code = 404;
                throw error;
            }
            return true;
        })

]