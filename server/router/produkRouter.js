let express=require("express");
let Router=express.Router();

const { verifyToken } = require("../middleware/AuthJWT");
const {buatProduk,getAllProduk}=require("../controllers/produk")

Router.get("/produk",verifyToken,getAllProduk);
Router.post("/produk",verifyToken,buatProduk);

module.exports=Router;