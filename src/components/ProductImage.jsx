import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { add } from "../redux/cartSlice";

const ProductImage = (props) => {
  const { product } = props;
  const [likedColor, setLikedColor] = useState("black");
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Track whether user is adding to cart
  const [quantity, setQuantity] = useState(1); // Track the entered quantity
  const dispatch = useDispatch();

  const toggleLikedColor = () => {
    setLikedColor((prevColor) => (prevColor === "black" ? "green" : "black"));
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true); // Show the quantity input
  };

  const handleConfirmAddToCart = () => {
    const productWithNumberPrice = {
      ...product,
      price: parseInt(product.price.replace(/[^\d]/g, ""), 10), // Convert price to number
      quantity, // Include the quantity
    };
    dispatch(add(productWithNumberPrice));
    setIsAddingToCart(false); // Reset to "Add to Cart" after adding
    setQuantity(1); // Reset the quantity
  };

  return (
    <div>
      <div className="productDetail">
        <div className="flex justify-between items-center">
          <button className="bg-red-600 text-white rounded px-6 mb-8">
            {product.discount}
          </button>
          <div className="showItem flex flex-col gap-2">
            <i
              className={`fa fa-heart bg-white border rounded-full p-2 cursor-pointer ${
                likedColor === "green" ? "text-green-500" : "text-black"
              }`}
              onClick={toggleLikedColor}
            ></i>
            <Link to={`/view-product/${product.id}`}>
              <i
                className="fa fa-eye bg-white text-black border rounded-full p-2 cursor-pointer"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
        </div>
        <img
          src={product.url ? product.url : "/images/g92-2-500x500 1.png"}
          alt="product images"
        />
        {!isAddingToCart ? (
          <p
            className="bg-black text-white py-2 pl-10 rounded cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </p>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              className="border p-2 rounded w-16"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleConfirmAddToCart}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
