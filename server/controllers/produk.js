let ProdukCollection=require("../database/produkModel");

class Produk {

   
    buatProduk(req,res){
        let {product_name,price,jumlah}=req.body;

        ProdukCollection.create({
            product_name,price,jumlah
        }).then((data)=>{
            res.status(200).json({
                message:`Produk sudah ditambahkan`,
                httpCode:200,
            });
        }).catch((err)=>{
            res.status(500).json({
                message:`${email} Produk gagal`,
                httpCode:500,
            });
        });
    }


}

module.exports=new Produk;