let express=require("express");
let Router=express.Router();

const { verifyToken } = require("../middleware/AuthJWT");
const {addCart, getCart, deleteAllCart}=require("../controllers/cart")

Router.get("/getCart",verifyToken,getCart);
Router.post("/addCart",verifyToken,addCart);
Router.delete("/getCart",verifyToken,deleteAllCart);

module.exports=Router;