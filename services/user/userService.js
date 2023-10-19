import { Op } from "sequelize";
import { Follow, User } from "../../models/Index.js";
import { reportError, sendEmail } from "../../config/emailHandler.js";

// export const getAnyUserProfile = async (req,res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 id: req.query.userId
//             },attributes:["id","first_name","last_name","email","username"]
//         });
//         throw new Error("This error has been thrown manually");
//         // res.status(200).json({user: user});
//     } catch (error) {
//         console.log("---------------------");
//         console.log(error.stack);
//         console.log("---------------------");
//         console.log("Error at getAnyUserProfile-userService ");
//         res.status(500).json({error: "There is some error while getting user!"});
//         // await sendEmail("auth@twitter.com", "lavesh@twitter.com", "Logged In", "sending some data!");
//         console.log(JSON.stringify(error));
//         await reportError("There is some error",error.stack);

//     }
// }
export const getAnyUserProfile = async (userId) => {
    const user = await User.findOne({
        where: {
            id: userId
        }, attributes: ["id", "first_name", "last_name", "email", "username"]
    });
    return user;
}

export const getUsersBySearch = async (searchKeyword) => {
    const users = await User.findAll({
        where: {
            username: {
                [Op.like]: '%' + searchKeyword + '%'
            }
        }, attributes: ["id", "first_name", "last_name", "email", "username"]
    });
    return users;
}
export const updateUser = async (user) => {
    let existingUser = await User.findOne({
        where: {
            id: user.id
        },
        attributes: ["id", "first_name", "last_name", "email", "username"]
    });
    if (!existingUser) {
        throw new Error("User doesn't exists!");
    }
    await user.save();
    return user;
}