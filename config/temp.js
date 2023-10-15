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
exports.createUser = async() => {
    
}

async function createUser(){
    const lavesh = User.build({
        first_name: "Lavesh", 
        last_name: "Ramrakhiani",
        username: "lavesh_21",
        email: "lavesh@gmail.com",
        password: "lavesh@21"
    });
    (async() => {
        await lavesh.save();
    })();
}
// createUser();

// exports.getUser = () => {
//     console.log(this.User);
//     return this.User;
// }