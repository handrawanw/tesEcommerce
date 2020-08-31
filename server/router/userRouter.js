let express=require("express");
let Router=express.Router();

const { buatToken,verifyToken } = require("../middleware/AuthJWT");
const {createUser,loginUser,deleteAll,getAll,getOne } = require("../controllers/users");

Router.post("/user/create",createUser);
Router.post("/user/login",loginUser,buatToken);
Router.delete("/user/delete",deleteAll);
Router.get("/user/all",getAll);
Router.get("/user/one",verifyToken,getOne);

module.exports=Router;