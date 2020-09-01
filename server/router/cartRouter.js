let express=require("express");
let Router=express.Router();

const { verifyToken } = require("../middleware/AuthJWT");
const {addCart, getCart, deleteAllCart,bayarCart}=require("../controllers/cart")

Router.get("/getCart",verifyToken,getCart);
Router.post("/addCart",verifyToken,addCart);
Router.post("/bayarCart",verifyToken,bayarCart);
Router.delete("/getCart",verifyToken,deleteAllCart);

module.exports=Router;