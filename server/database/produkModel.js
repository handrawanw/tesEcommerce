let mongoose=require("mongoose");

let Schema=mongoose.Schema;

let ProdukModel=new Schema({
    product_name:{
        type:String,
        required:["Nama produk harus ada !! ",true]
    },
    price:{
        type:Number,
        required:["Harga harus ada !! ",true]
    },
    jumlah:{
        type:Number,
        required:["Jumlah harus ada !! ",true]
    },
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

let ProdukCollection=mongoose.model("Produk",ProdukModel);

module.exports=ProdukCollection;