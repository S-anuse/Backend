const http = require("http");
// createserver
const server = http.createServer((req , res)=>{
    res.end("hello world") ;
})
server.listen(3000) ; 

// type localhost:3000 on but before that run node httppp.js on terminal
