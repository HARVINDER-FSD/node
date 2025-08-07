const express = require("express")
const fs = require("fs")
const userRoute = express.Router();

userRoute.get('/form',(req,res)=>{
    
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
})
userRoute.get('/about',(req,res)=>{
   fs.readFile('about.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
})
 
userRoute.get('/contact',(req,res)=>{
    fs.readFile('contact.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
})
userRoute.get('/services',(req,res)=>{
    fs.readFile('services.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
})
module.exports = userRoute




// app.get("/form",(req,res)=>{
//     fs.readFile('index.html', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading file');
//             return;
//         }
//         res.send(data);
//     });
// })

// app.get("/about",(req,res)=>{
//     fs.readFile('about.html', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading file');
//             return;
//         }
//         res.send(data);
//     });
// })

// app.get("/form",(req,res)=>{
//     fs.readFile('contact.html', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading file');
//             return;
//         }
//         res.send(data);
//     });
// })
// app.get("/form",(req,res)=>{
//     fs.readFile('services.html', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading file');
//             return;
//         }
//         res.send(data);
//     });
// })