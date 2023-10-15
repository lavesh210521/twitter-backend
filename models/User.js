import { Model,DataTypes } from "sequelize";
import {sequelize} from "../config/connection.js";
import bcrypt from "bcrypt"


export class User extends Model{}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    username: {
        type:DataTypes.STRING,
        allowNull: false,
        // validate:{
        //     is: /^([a-z]+[0-9a-z_.]*){4,}/i
        // },
        unique: true
    },
    email:{
        type:DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            is: /^.{8,}/i
        },
        // set(value){
        //     let salt = bcrypt.genSaltSync(10);
        //     let hash = bcrypt.hashSync(value, salt)
        //     this.setDataValue('password',hash);
        // }
    }
},{
    sequelize,
    modelName: 'User'
});
// User.hasMany(Tweet,{
//     foreignKey: "user_id"
// });


