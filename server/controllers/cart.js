let CartCollection=require("../database/cartModel");
let ProdukCollection=require("../database/produkModel");

class Cart {

    addCart(req,res){
        let {enkId}=req.body;
        ProdukCollection.findOne({_id:enkId}).then((data)=>{
            if(data){
                
            }else{
                res.status(201).json({
                    message:"Produk tidak ditemukan",
                    httpCode:201,
                });
            }
        }).catch((err)=>{
            res.status(500).json({
                message:`Produk gagal ditampilkan`,
                httpCode:500,
            });
        });
    }

}

module.exports=new Cart;