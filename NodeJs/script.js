// const fs = require("node:fs/promises");

// const fs = require("node:fs");

const fs = require("fs");


// writefile , copyfile , unlink , appendfile , rename

// fs.writeFile("hey.txt" , "hey hello kaise ho",(err)=>{
//     if(err) console.log(err);
//     else console.log("done"); 
// })

// here callback means function

// fs.appendFile("hey.txt" , "mein toh accha hoon", (err)=>{
//     if(err) console.log(err);
//     else console.log("done"); ;
    
    
// })


// fs.rename("hey.txt" , "hello.txt" , (err)=>{
//     if(err) console.error(err);
//     else console.log("done");
    
    
// })


// fs.copyFile("hello.txt" , "./copy/chacha.txt" , (err)=> {
// if (err) console.error(err);
// else console.log("done");
// })


// // to delete file
// fs.unlink("hello.txt" , (err)=>{
//     if(err) console.log(err);
//     else console.log("done");
// })

// // only removes blank folder
// fs.rmdir("./tp",(err)=>{
//     if(err) console.log(err);
//     else console.log("removed");
// })

// // to remove even if it contains files
fs.rm("./copy" , {recursive: true} , (err)=>{
    if(err) console.log(err);
    else console.log("removed");
    
    
})
