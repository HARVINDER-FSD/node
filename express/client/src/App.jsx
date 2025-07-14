import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './component/ProductList';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./component/Navbar"
import Home from './pages/Home';
import axios from 'axios'
const App = () => {
  
    const [value,setValue] = useState([])
    
  function fetchData ()
  {
      axios.get('http://localhost:1212/product')
      .then((res)=>setValue(res.data))
      .catch((err)=>console.log(err))
  }
  
  useEffect(()=>{
    fetchData()
  },[])

  return (
  
    <div>
  <Navbar></Navbar>

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product" element={<ProductList products={value} />} />
</Routes>


  </div>);
};

export default App;
