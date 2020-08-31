let CartCollection=require("../database/cartModel");
let ProdukCollection=require("../database/produkModel");

class Cart {

    addCart(req,res){
        let {enkId,jumlahCart}=req.body;
        ProdukCollection.findOne({_id:enkId}).then((data)=>{
            if(data){
                return data;
            }else{
                throw({message:"Produk tidak ditemukan"});
            }
        }).then((data)=>{
                if(jumlahCart<=data.jumlah){
                    return CartCollection.create({
                        user:data.user,
                        product_name:data.product_name,
                        price:data.price,
                        jumlah:jumlahCart,
                        from_product_id:data._id,
                        status:"BUY",
                    }).then((dataCart)=>{
                        return {
                            dataCart,
                            dataProduk:data,
                        };
                    }).catch((err)=>{
                        throw({message:err.message});
                    });
                }else{
                    throw({message:`Pesanan tidak dapat dicukupi, jumlah stok ${data.jumlah}`});
                }

        }).then(({dataCart,dataProduk})=>{
           return ProdukCollection.findOneAndUpdate({
               _id:dataCart.from_product_id,
               
           },{
               jumlah:dataProduk.jumlah-dataCart.jumlah
           }).then((data)=>{
                return data;
           }).catch((err)=>{
                throw({message:err.message});
           });
        }).then((data)=>{
            res.status(200).json({
                message:"Sudah ditambahkan ke cart",
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

    deleteAllCart(req,res){
        CartCollection.deleteMany({}).then((data)=>{
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

    getCart(req,res){
        CartCollection.find({}).then((data)=>{
            if(data){
                res.status(200).json({
                    message:"Data ditemukan",
                    data,
                    httpCode:200,
                });
            }else{
                res.status(200).json({
                    message:"Data tidak ditemukan",
                    data,
                    httpCode:200,
                });
            }
        }).catch((err)=>{
            res.status(500).json({
                message:err.message,
                httpCode:500,
            });
        });
    }

}

module.exports=new Cart;