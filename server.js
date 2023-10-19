const express=require("express");
const app=express();
const path=require("path");
const multer=require("multer");
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'public/files');


    },
    filename:function(req,file,cb){
        console.log(file);
        let ext=file.mimetype.split("/")[1];

        cb(null,req.session.username+"."+ext);


    }
})
//const upload=multer({dest:'public/files'});
function test(req,file,cb)
{
    let ext=file.mimetype.split("/")[1];
    if(ext=="jpeg" || ext=="jpg")
    cb(null,true);
else
cb(new Error('FIle not supported'),false);

}
const upload=multer({storage:storage,fileFilter:test,limits:{fileSize:1020}});



app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/forms.html"));

})
app.post("/upload",upload.single("pic"),(req,res)=>{

    res.end();
})
app.listen(3000,(err)=>{
    console.log("Server Started...");

})