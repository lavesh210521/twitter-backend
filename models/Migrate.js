import { User,Tweet,Follow,Like } from "./Index.js";

await User.sync({force:true});
console.log("-----------------------------------------")
console.log("Migrated User");
console.log("-----------------------------------------")
await Tweet.sync({force:true});
console.log("-----------------------------------------")
console.log("Migrated Tweet");
console.log("-----------------------------------------")
await Like.sync({force:true});
console.log("-----------------------------------------")
console.log("Migrated Like");
console.log("-----------------------------------------")
await Follow.sync({force:true});