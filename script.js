// alert() ;
// var arr = [1,2,3,4 ,"Sonu"] ;
// arr.forEach((x) => {
//     console.log(`${x} Hello`) ;
// }
// );
// // console.log(arr.indexOf(11));
// console.log(arr.indexOf("Sonu"));
 
// var ans = arr.map((val) => {
//     return 13 ;   
// })
// console.log(ans);

// // filter
// var arr2 = [2,3,45,6]
// arr2.filter((val) => {
//     if(val > 3) return true ;
//     else return false ;
// })


// var answer = arr.find((val) => {
//     if(val == "Sonu") return val ;
// })
// console.log(answer);


// // objects 
// var kolu = 12 ;
// var type = {
//     a : kolu , 
//     age : 22
// }
// console.log(type['a']);
// type.a = "Sonu" ;
// console.log(type["a"]);
// Object.freeze(type) ;
// type.age = 23 ;
// console.log(type.age); 

// // find function length
// function abcd(a , b, c) {
//     return 12 ;
// }


// var ans3 = abcd() ;


// // async await
var func = async () => {
    var blob = await fetch("https://randomuser.me/api/");
    var data = await blob.json() ;
    console.log(data);
    console.log(data.results[0].name);
    
}
func() ;


// synchronous -> code is executed line by lne
// asynchronous -> send asynchronous code in side stack and run next code
// jo bhi code async nature ka ho usey side stack mein bhej do and agle code ko chalao jo bhi sync nature ka ho , jab bhi saara syn code chal jaaye , tab check karo ki async code complete hua ya nahi and agar wo complete hua ho to usey main stack mein laao and chalado

// if a function contains asynchronous work then use async await for that function

