import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();
const sequelize = new Sequelize('twitter', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

export {sequelize};