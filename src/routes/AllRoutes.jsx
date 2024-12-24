import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from '../components/About'
import Contact from '../components/Contact'
import SignUp from '../auth/SignUp'
import ProductDetail from '../pages/ProductDetail'
import Home from '../pages/Home'
import Login from '../auth/Login'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/view-product" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path='posts/:id/:name' element={<PostItem/>}/> // in dynamic param u can add as many params as possible
        <Route path='profile' element={<Profile/>}/> */}
        <Route path='*' element={
            <>
            <h1>Page not found!!!</h1>
            </>
          }/>
    </Routes>
  )
}

export default AllRoutes