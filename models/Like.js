import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

export class Like extends Model { }
Like.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    tweet_id: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'Like',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'tweet_id']
        }
    ]
});

