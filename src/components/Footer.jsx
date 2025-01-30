import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between gap-2 footer-container">
        <div className="common-flex">
          <a href="#">MDBHUB</a>
          <a href="#">Subscribe</a>
          <a href="#">Get 10% off your first order</a>
          <div className="relative">
            <input
              className="px-10 h-10 border rounded focus:outline-none border-none"
              type="text"
              id="search"
              placeholder="Enter your email"
            />
            <i
              className="fa fa-paper-plane absolute left-48 top-1/2 transform -translate-y-1/2 text-black"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <div className="common-flex">
          <p>Support</p>
          <p>
            11, Umar Muhammed street, <br />
            Ibeju Lekki.Lagos state.
          </p>
          <p>mdbstore@gmail.com</p>
          <p>+234 816 814 4042</p>
        </div>
        <div className="common-flex">
          <p>Quick Links</p>
          <Link to="/info">Privacy Policy</Link>
          <Link to="/info">Terms of use</Link>
          <Link to="/info">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="common-flex">
          <p>Account</p>
          <Link to="/profile">My Account</Link>
          <Link to="/login">Login / Register</Link>
          <Link to="/cart">Cart</Link>
          <Link to="wishlist">WishList</Link>
          <Link to="shop">Shop</Link>
        </div>
        <div className="common-flex">
          <p>Download App</p>
          <img
            src="http://res.cloudinary.com/dgyovcg73/image/upload/v1734520705/file-1734520680961_x4209z.png"
            alt="footer-image"
          />
          <div className="flex gap-4">
            <i
              className="fab fa-facebook text-white-500 hover:scale-110 cursor-pointer"
              aria-hidden="true"
            ></i>
            <i
              className="fab fa-twitter text-white-400 hover:scale-110 cursor-pointer"
              aria-hidden="true"
            ></i>
            <i
              className="fab fa-instagram text-white-400 hover:scale-110 cursor-pointer"
              aria-hidden="true"
            ></i>
            <i
              className="fab fa-linkedin text-white-400 hover:scale-110 cursor-pointer"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
