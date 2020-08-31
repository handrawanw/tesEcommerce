let ProdukCollection=require("../database/produkModel");

class Produk {

   
    buatProduk(req,res){
        let {product_name,price,jumlah}=req.body;
        ProdukCollection.create({
            user:req.decoded.id,
            product_name,price,jumlah
        }).then((data)=>{
            res.status(200).json({
                message:`Produk sudah ditambahkan`,
                httpCode:200,
            });
        }).catch((err)=>{
            res.status(500).json({
                message:`Produk gagal ditambahkan`,
                httpCode:500,
            });
        });
    }

    getAllProduk(req,res){
        ProdukCollection.find({}).then((data)=>{
            if(data){
                res.status(200).json({
                    message:`Produk ditemukan`,
                    data,
                    httpCode:200,
                });
            }else{
                res.status(200).json({
                    message:`Produk tidak ditemukan`,
                    data,
                    httpCode:200,
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

module.exports=new Produk;