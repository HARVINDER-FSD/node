const express = require("express")
const fs = require("fs")
const cors = require('cors')


const app = express();


app.use(express.json()) //middleware
app.use(cors())


app.get('/product',(req,res)=>{
    fs.readFile('./db.json',"utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            const {product} = JSON.parse(data)
            res.send(product)
        }

    })
})

app.post("/addproduct", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataFromdb = JSON.parse(data);
      const products = dataFromdb.product; // ✅ fixed key
      let productID = products.length > 0 ? products[products.length - 1].id : 0;

      const newProduct = { ...req.body, id: ++productID }; // ✅ define before use
      products.push(newProduct);

      fs.writeFile("./db.json", JSON.stringify(dataFromdb), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Product added", product: newProduct }); // ✅ correct syntax
        }
      });
    }
  });
});

app.delete("/deletproduct/:id", (req, res) => {
  const { id } = req.params; 

  fs.readFile('./db.json', 'utf-8', (err, data) => { 
    if (err) {
      res.send(err);
    } else {
      const dataFromdb = JSON.parse(data); 
      const filterProduct = dataFromdb.product.filter((el) => el.id != id);

      fs.writeFile('./db.json', JSON.stringify({ product: filterProduct }), (err) => {
        if (err) {
          res.send(err); 
        } else {
          res.send('data deleted'); 
        }
      });

    
    }
  });
});

app.listen(1212, () => {
  console.log("Server Running....!");
});