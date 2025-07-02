const http = require("http")
let server = http.createServer((req,resp)=>{
    console.log(1,2)
    resp.end(" server here")
})
server.listen(8080, () => {
  console.log("Running on port 8080...");
});
