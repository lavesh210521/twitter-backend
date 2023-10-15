import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
export class Follow extends Model { }
Follow.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    from_user_id: {
        type: DataTypes.INTEGER
    },
    to_user_id: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    modelName: 'Follow',
    indexes: [
        {
            unique: true,
            fields: ['from_user_id', 'to_user_id']
        }
    ]

});


