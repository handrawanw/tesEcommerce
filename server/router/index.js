let express=require("express");
let Router=express.Router();

Router.use(require("../router/userRouter"));

Router.use(require("../router/produkRouter"));

module.exports=Router;