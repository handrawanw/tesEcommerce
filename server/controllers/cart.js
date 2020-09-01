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
                            return {data,dataUser};
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
        }).then(({data,dataUser})=>{
            //analisa pesanan cukup ngga sama stok produk
            //buat pesanan
                if(jumlahCart<=data.jumlah){
                    return CartCollection.create({
                        user:dataUser._id,
                        product_name:data.product_name,
                        price:Number(data.price*jumlahCart),
                        jumlah:jumlahCart,
                        from_product_id:data._id,
                        status:"FAVORITE",
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

        }).then((data)=>{
            res.status(200).json({
                message:"Sukses ditambahkan ke cart",
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

    bayarCart(req,res){
        //get data cart dulu dan data produk
        CartCollection.find({user:req.decoded.id}).then((dataCart)=>{
            if(dataCart){
                return {dataCart};
            }else{
                throw({
                    message:"data Cart tidak ada",
                    type:"Error data cart promise tidak ada",
                });
            }
        }).then(({dataCart})=>{
            //setelah itu data produk dikurangin jumlah cart
            return new Promise((resolve,reject)=>{
                "use strict";
                try {
                    dataCart.filter((item)=>item.status.toUpperCase()==="FAVORITE").forEach(async (item)=>{
                        await CartCollection.updateOne({_id:item._id},{status:"SUDAH DIBELI"});
                        //update status produk
                        let getSaldoUserPembeli=await UserCollection({_id:req.decoded.id});
                        //get saldo user pembeli
                        let dataProduk=await ProdukCollection.findOne({_id:item.from_product_id}).populate("user",["saldo"]);
                        //data produk si penjual
                        await ProdukCollection.updateOne({_id:dataProduk._id},{jumlah:Number(Number(dataProduk.jumlah)-item.jumlah)});
                        //kurangin stok barang
                        await UserCollection.updateOne({_id:req.decoded.id},{saldo:Number(Number(getSaldoUserPembeli.saldo)-Number(item.price))})
                        //kurangin saldo user pembeli
                        await UserCollection.updateOne({_id:dataProduk.user._id},{saldo:Number(Number(dataProduk.user.saldo)+Number(item.price))})
                        //tambah saldo user penjual
                    });
                    resolve({dataCart});
                }catch(error){
                    reject({
                        message:error.message,
                        type:"ERROR MESSAGE",
                    });                    
                }
            })
        }).then((data)=>{
            res.status(200).json({
                message:"Cart sukses dibayar",
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
        CartCollection.find({user:req.decoded.id}).then((data)=>{
            if(data){
                let totalBayar=0;
                data.forEach((item)=>{
                    totalBayar+=item.price;
                });
                res.status(200).json({
                    message:"Data ditemukan",
                    data,
                    total:totalBayar,
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