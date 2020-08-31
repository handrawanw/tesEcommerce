let ProdukCollection=require("../database/produkModel");

class Produk {

   
    buatProduk(req,res){
        let {product_name,price,jumlah,product_gambar}=req.body;
        ProdukCollection.create({
            user:req.decoded.id,
            product_name,price,jumlah,product_gambar
        }).then((data)=>{
            res.status(200).json({
                message:`Produk sudah ditambahkan`,
                httpCode:200,
            });
        }).catch((err)=>{
            res.status(500).json({
                message:err.message,
                httpCode:500,
            });
        });
    }

    deleteAllProduk(req,res){
        ProdukCollection.deleteMany({}).then((data)=>{
            res.status(200).json({
                message:'Sukses delete',
                data,
                httpCode:200,
            });
        }).catch((err)=>{
            res.status(500).json({
                message:err.message,
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