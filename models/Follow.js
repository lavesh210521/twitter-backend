import { Model,DataTypes } from "sequelize";
// const sequelize = require("../temp_models/base").getConnection();
import {sequelize} from "../db/connection.js";
export class Follow extends Model{}
Follow.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    from_user_id:{
        type:DataTypes.INTEGER
    },
    to_user_id:{
        type:DataTypes.INTEGER
    },
},{
    sequelize,
    modelName: 'Follow'
});


