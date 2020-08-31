let CartCollection=require("../database/cartModel");
let ProdukCollection=require("../database/produkModel");
let UserCollection=require("../database/userModel");

class Cart {

    addCart(req,res){
        let {enkId,jumlahCart}=req.body;
        ProdukCollection.findOne({_id:enkId}).then((data)=>{
            if(data){
                //cek saldo dulu
                return UserCollection.findOne({_id:req.decoded.id}).then((dataUser)=>{
                    if(dataUser){
                        if((jumlahCart*data.price)<=dataUser.saldo){
                            return data;
                        }else{
                        throw({
                            type:"Error User Cek saldo",
                            message:`Jumlah pesanan RP ${(jumlahCart*data.price)} melebihi saldo ${dataUser.saldo} , maaf saldo tidak mencukupi`});
                        }
                    }else{
                        throw({
                            type:"Error User Cek saldo",
                            message:"Gagal cek saldo, user tidak ditemukan"});
                    }
                }).catch((err)=>{
                    throw({
                        type:"Error User Cek saldo",
                        message:err.message});
                });
            }else{
                throw({
                    type:"Error User Cek saldo",
                    message:"Produk tidak ditemukan"});
            }
        }).then((data)=>{
            //analisa pesanan cukup ngga sama stok produk
            //buat pesanan
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
                        throw({
                            type:"Error create cart",
                            message:err.message});
                    });
                }else{
                    throw({
                        type:"Error create cart",
                        message:`Pesanan tidak dapat dicukupi, jumlah stok ${data.jumlah}`});
                }

        }).then(({dataCart,dataProduk})=>{
            //kalaw cukup kurangin stok produk
           return ProdukCollection.findOneAndUpdate({
               _id:dataCart.from_product_id,
               
           },{
               jumlah:dataProduk.jumlah-dataCart.jumlah
           }).then((data)=>{
                return {dataCart};
           }).catch((err)=>{
                throw({
                    type:"Error kurangin produk",
                    message:err.message});
           });
        }).then(({dataCart})=>{
            //kurangin saldo
            return UserCollection.findOne({_id:req.decoded.id}).then((data)=>{
               if(data){
                    let hasilSaldo=Number(Number(data.saldo)-Number(dataCart.price*dataCart.jumlah));
                    return UserCollection.updateOne({_id:req.decoded.id},{saldo:hasilSaldo}).then((dataUpdate)=>{
                        return true;
                    }).catch((err)=>{
                        throw({
                            type:"Error kurangin saldo user 2",
                            message:err.message});
                    });
               }else{
                    throw({
                        type:"Error kurangin saldo user 3",
                        message:"Info user tidak ada"});
               } 
            }).catch((err)=>{
                    throw({
                        type:"Error kurangin saldo user 1",
                        message:err.message});
            });
        }).then((data)=>{
            res.status(200).json({
                message:"Sukses ditambahkan",
                data,
                httpCode:200,
            });
        }).catch((err)=>{
            res.status(500).json({
                message:err.message,
                type:err.type,
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