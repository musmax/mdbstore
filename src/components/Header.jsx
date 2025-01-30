import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCart = useSelector((state) => state.cart.totalCart);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Sale Banner */}
      <div className="bg-black text-white h-10 flex justify-center items-center text-sm px-4 text-center">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="underline">
            <a href="#">ShopNow</a>
          </span>
          <span className="pl-5 hidden sm:inline">English</span>
        </p>
      </div>

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MDBHUB</h1>

        {/* Hamburger Menu (Mobile) */}
        <button className="md:hidden text-xl" onClick={toggleMobileMenu}>
          ☰
        </button>

        {/* Navigation (Desktop) */}
        <ul className="hidden md:flex gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/sign-up">Sign Up</Link>
        </ul>

        {/* Search & Icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-auto">
            <input
              className="px-4 h-10 w-full md:w-56 border rounded focus:outline-none"
              type="text"
              id="search"
              placeholder="Search anything"
            />
            <i
              className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2"
              aria-hidden="true"
            ></i>
          </div>

          {/* Icons */}
          <div className="flex gap-4 items-center">
            <i className="fa fa-heart text-xl" aria-hidden="true"></i>
            <div className="relative">
              <Link to="/cart">
                <i
                  className="fa fa-shopping-cart text-2xl md:text-3xl"
                  aria-hidden="true"
                ></i>
                {totalCart > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {totalCart}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 py-2">
          <ul className="flex flex-col gap-2 text-center">
            <Link to="/" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/contact" onClick={toggleMobileMenu}>
              Contact
            </Link>
            <Link to="/about" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link to="/sign-up" onClick={toggleMobileMenu}>
              Sign Up
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
