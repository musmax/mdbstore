import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductImage = (props) => {
  const [likedColor, setLikedColor] = useState('black');

  // Function to toggle the color
  const toggleLikedColor = () => {
    setLikedColor((prevColor) => (prevColor === 'black' ? 'green' : 'black'));
  };

  return (
    <div>
      <div className="productDetail">
        <div className="flex justify-between items-center">
          {/* Button */}
          <button className="bg-red-600 text-white rounded px-6 mb-8">{props.discount}</button>

          {/* Icons */}
          <div className="showItem flex flex-col gap-2">
            <i
              className={`fa fa-heart bg-white border rounded-full p-2 cursor-pointer ${
                likedColor === 'green' ? 'text-green-500' : 'text-black'
              }`}
              onClick={toggleLikedColor} // Handle click
            ></i>
            <Link to='/view-product'>
            <i
              className="fa fa-eye bg-white text-black border rounded-full p-2 cursor-pointer"
              aria-hidden="true"
            ></i>
            </Link>
          </div>
        </div>

        {/* Product Image */}
        <img
          src={props.url ? props.url : 'public\\images\\g92-2-500x500 1.png'}
          alt="product images"
        />
        <p className="bg-black text-white py-2 pl-10 rounded cursor-pointer">Add to cart</p>
      </div>
    </div>
  );
};

export default ProductImage;
