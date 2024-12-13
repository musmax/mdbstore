import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
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