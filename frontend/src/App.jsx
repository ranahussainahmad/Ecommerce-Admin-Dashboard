import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import UpdateProduct from './pages/UpdateProduct'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
     <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/products' element={<Products/>} />
            <Route path='/products/:id' element={<ProductDetail/>} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
     </>
  )
}

export default App
