import { Sequelize } from "sequelize";
const sequelize = new Sequelize('twitter', 'lavesh', 'lavesh', {
    host: 'localhost',
    dialect: 'mysql'
});

export {sequelize};