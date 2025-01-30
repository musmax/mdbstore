import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";

const LoginHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalCart = useSelector((state) => state.cart.totalCart);
  const logoutDispatch = useDispatch();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-black text-white h-10 flex justify-center items-center text-xs md:text-sm">
        <p className="text-center font-mono">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="underline">
            <a href="#">ShopNow</a>
          </span>
          <span className="pl-5 hidden md:inline">English</span>
        </p>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center py-4 px-4 md:px-8 shadow-md">
        <h1 className="text-2xl font-bold">MDBHUB</h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* Nav Links */}
        <ul
          className={`fixed md:static top-0 right-0 w-2/3 h-full md:h-auto bg-white shadow-lg md:shadow-none flex flex-col md:flex-row gap-4 text-sm items-center md:items-center p-5 md:p-0 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <button onClick={toggleMenu} className="self-end md:hidden text-2xl">
            ✕
          </button>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/sign-up" onClick={toggleMenu}>
            Sign Up
          </Link>
          <Link to="/categories" onClick={toggleMenu}>
            Category
          </Link>
          <Link to="/products" onClick={toggleMenu}>
            Product
          </Link>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-4">
          <i className="fa fa-heart text-xl"></i>
          <div className="relative">
            <Link to="/cart">
              <i className="fa fa-shopping-cart text-2xl"></i>
              {totalCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {totalCart}
                </span>
              )}
            </Link>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <img
              src="/images/user.png"
              alt="User"
              className="w-8 h-8 cursor-pointer"
              onClick={toggleDropdown}
            />
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
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
  );
};

export default LoginHeader;
