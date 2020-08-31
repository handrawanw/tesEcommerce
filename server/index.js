let express=require("express");
let next=require("next");

let PORT=process.env.PORT||3001;
let dev=process.env.NODE_ENV!=='production';
let app=next({dev});

let handle=app.getRequestHandler();

//plugin
let cors=require("cors");
//plugin

app.prepare().then(()=>{

    let server=express();
   
    //connect to mongo db
    require("./mongo");
    //connect to mongo db

    //req body
        server.use(express.urlencoded({extended:true}));
        server.use(express.json());
    //req.body

    //cors
    server.use(cors());
    //cors

    //router
    server.use(require("./router/index"));
    //router

    server.get("*",(req,res)=>{
        return handle(req,res);
    });

    server.listen(PORT,(err)=>{
        if (err) throw err;
            console.log(`OK BRO Server is running ${PORT}`);
    });


}).catch((err)=>{
    console.error(err);
});