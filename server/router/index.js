let express=require("express");
let Router=express.Router();

Router.use(require("../router/userRouter"));

module.exports=Router;