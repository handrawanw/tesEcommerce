let {userModel}=require("../database/index");

class Users {

    createUser(req,res){
        let {email,password}=req.body;
        userModel.findOne({email}).then((data)=>{
            if(data){
                res.status(200).json({
                    message:`${email} sudah terdaftar`,
                    httpCode:200,
                });
            }else{
                userModel.create({
                    email,password
                }).then((hasil)=>{
                    res.status(200).json({
                        message:`${data.email} User create`,
                        httpCode:200,
                    });
                }).catch((err)=>{
                    res.status(500).json({
                        message:`${email} user failed created`,
                        httpCode:500,
                    });
                })
            }
        }).catch((err)=>{
            res.status(500).json({
                message:err.message,
                httpCode:500,
            });
        })
    }

    getAll(req,res){
        userModel.find({}).then((data)=>{
            res.status(200).json({
                message:`Success get all`,
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

    getOne(req,res){
        userModel.findOne({_id:req.decoded.id}).then((data)=>{
            res.status(200).json({
                message:`Success get one`,
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


    deleteAll(req,res){
        userModel.deleteMany({}).then((data)=>{
            res.status(200).json({
                data,
                httpCode:200,
            });
        }).catch((err)=>{
            res.status(500).json({
                message:err.message,
                httpCode:500,
            });
        })
    }

    loginUser(req,res,next){
        let {email,password}=req.body;
        userModel.findOne({
            email,password
        }).then((data)=>{
            if(data){
                next();
            }else{
                res.status(403).json({
                    message:"Login failed, access denied",
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

module.exports=new Users;