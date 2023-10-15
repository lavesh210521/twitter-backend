import {Model,DataTypes} from "sequelize";
import {sequelize} from "../config/connection.js";
export class Tweet extends Model{}
Tweet.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type:DataTypes.INTEGER
    },
    tweet:{
        type:DataTypes.STRING,
    },
    comment_id:{
        type:DataTypes.INTEGER
    },
    image_url:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Tweet',
    indexes:[
        {fields:['user_id']}
    ]
},);


