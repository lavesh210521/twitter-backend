import {User,Follow,Like,Tweet} from "./Index.js";
await User.destroy({
    truncate: true
});
await Follow.destroy({
    truncate: true
});
await Like.destroy({
    truncate: true
});
await Tweet.destroy({
    truncate: true
});