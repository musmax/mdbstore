import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../redux/authSlice'

const LoginHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const totalCart = useSelector((state) => state.cart.totalCart);  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const logoutDispatch = useDispatch();

  return (
    <div>    
        <div className='bg-black text-white h-10 pt-2'>
            <p className='text-center font-mono'>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className='underline'><a href="#">ShopNow</a></span>
                <span className='pl-5'>English</span>
            </p>

        </div>

        <div className='flex gap-1 justify-between items-center py-2 LoginHeader-container'>
          <h1 className='text-2xl font-bold'>MDBHUB</h1>
          <ul className='flex gap-4 text-sm'>
              <Link to="/">Home</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/about">About</Link>
              <Link to="/sign-up">Sign Up</Link>
              <Link to="/categories">Category</Link>
              <Link to="/product">Product</Link>
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
              <div className="relative">
            <Link to="/cart">
              <i className="fa fa-shopping-cart text-3xl" aria-hidden="true"></i>
              {totalCart > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {totalCart}
                </span>
              )}
            </Link>
            </div>

            </div>
            <div>
              <div className='pl-2'>
                <img src="/images/user.png" alt="" onClick={toggleDropdown}/>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Manage my Account
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Order
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Cancellations
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Reviews
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => logoutDispatch(logout())}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoginHeader;
