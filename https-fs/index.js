const http = require("http");
const fs = require("fs")
let server = http.createServer((req, resp) => {
    if(req.url=="/product" && req.method =="GET"){
      fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            resp.end("not found")
        }
        else{
            resp.end(data)
        }
    })  
    }
    else{
        resp.end("cheak method")
    }
    
});

server.listen(8012, () => {
    console.log("server run");
    console.log("http://localhost:8012");
});

// const http = require("http")
// let server = http.createServer((req,resp)=>{
//     console.log(1,2)
//     resp.end(" server here")
// })
// server.listen(8080, () => {
//   console.log("Running on port 8080...");
// });