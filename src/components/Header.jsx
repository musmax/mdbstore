import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>    
        <div className='bg-black text-white h-10 pt-2'>
            <p className='text-center font-mono'>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className='underline'><a href="#">ShopNow</a></span>
                <span className='pl-5'>English</span>
            </p>

        </div>

        <div className='flex gap-1 justify-between items-center py-2 header-container'>
          <h1 className='text-2xl font-bold'>MDBHUB</h1>
          <ul className='flex gap-4 text-sm'>
              <Link to="/">Home</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/about">About</Link>
              <Link to="/sign-up">Sign Up</Link>
          </ul>
          <div className='flex items-center border rounded px-3'>
            <div className='relative'>
              <input 
                className='px-10 h-10 border rounded focus:outline-none'
                type="text" 
                id="search" 
                placeholder='Search anything'
              />
              <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true"></i>
            </div>
            <div className='flex gap-4 ml-4 items-center'>
              <i className="fa fa-heart text-xl" aria-hidden="true"></i>
              <i className="fa fa-shopping-cart text-xl" aria-hidden="true"></i>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header
