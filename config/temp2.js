const User = require("./temp").User;
const aniket = User.build({
    first_name: "Aniket", 
    last_name: "Singh",
    username: "ani_21",
    email: "ani@gmail.com",
    password: "ani@21"
});
(async() => {
    await aniket.save();
})();