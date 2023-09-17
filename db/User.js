const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./base").getConnection();

exports.User = sequelize.define("users",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    username: {
        type:DataTypes.STRING,
        unique: true
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
});
function temp(){
    console.log(sequelize.define("xyz") === sequelize.models);
}
exports.createUser = async(first_name,last_name,username,email,password) => {
    const user = exports.User.build({
        first_name: first_name, 
        last_name: last_name,
        username: username,
        email: email,
        password: password
    });
    (async() => {
        await user.save();
    })();
}
temp();