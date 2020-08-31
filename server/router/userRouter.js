let express=require("express");
let Router=express.Router();

const { buatToken } = require("../middleware/AuthJWT");
const {createUser,loginUser,deleteAll,getAll } = require("../controllers/users");

Router.get("/user/all",getAll);
Router.post("/user/create",createUser);
Router.post("/user/login",loginUser,buatToken);
Router.delete("/user/delete",deleteAll);

module.exports=Router;