import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from '../pages/About'
import Contact from '../pages/Contact'
import SignUp from '../auth/SignUp'
import ProductDetail from '../pages/ProductDetail'
import Home from '../pages/Home'
import Login from '../auth/Login'
import Cart from '../pages/Cart'
import SuccessfulPage from '../pages/SuccessfulPage'
import VerifyEmail from '../pages/VerifyEmail'
import Product from '../pages/Product'
import CreateCategory from '../category/createCategory'
import Category from '../category/Category'
import EditCategory from '../category/EditCategory'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/view-product" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/registration-successful" element={<SuccessfulPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/category-form" element={<CreateCategory />} />
        <Route path="/category/edit/:id" element={<EditCategory />} />
        <Route path="/product" element={<Product />} />
        <Route path='*' element={
            <>
            <h1>Page not found!!!</h1>
            </>
          }/>
    </Routes>
  )
}

export default AllRoutes