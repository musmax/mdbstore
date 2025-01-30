import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import ColorCircle from "../components/ColorCircle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/productSlice";

const ProductDetail = () => {
  // const carts = useSelector((state) => state.cart.cartList);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  console.log(product);

  useEffect(() => {
    // Dispatch the thunk and unwrap the result to update local state
    if (id) {
      dispatch(getProduct(id))
        .unwrap()
        .then((data) => {
          setProduct(data.data);
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
        });
    }
  }, [dispatch, id]);

  const [counter, setCounter] = useState(0);

  const [likedColor, setLikedColor] = useState("black");

  function toggleLikedColor() {
    setLikedColor((prevColor) => (prevColor === "black" ? "red" : "black"));
  }

  function determineCounter(determinant) {
    if (determinant == "increase") {
      setCounter(counter + 1);
    }
    if (determinant == "decrease") {
      setCounter(counter - 1);
      if (counter <= 0) {
        setCounter(0);
      }
    }
  }
  return (
    <div className="flex gap-16 product-container">
      <div className="flex gap-3">
        <div className="grid grid-rows-4 gap-2 justify-items-center">
          <div>
            <img src="/images/Frame 895.png" alt="product image" />
          </div>
          <div>
            <img src="/images/Frame 896.png" alt="product image" />
          </div>
          <div>
            <img src="/images/Frame 897.png" alt="product image" />
          </div>
          <div>
            <img src="/images/Frame 919.png" alt="product image" />
          </div>
        </div>
        <div className="grid">
          <img src="/images/Frame 894.png" alt="product image" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>{product.name}</p>
        <div className="flex gap-3">
          <div>
            <Rating rate={4} />
          </div>
          <p>(150 Reviews) | {product.isOutOfStock}</p>
        </div>
        <p>{`# ${product.price}`}</p>
        <p>{product.description}</p>
        <p className="w-52 text-gray-400">-</p>
        <div className="flex items-center gap-3">
          colors: <ColorCircle colorArray={["red", "yellow"]} />
        </div>
        <div className="flex gap-3">
          <p>Size:</p>
          <ul className="flex gap-3">
            {product.availableSizes?.map((size, index) => (
              <li key={index} className="border rounded p-2">
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-10">
          <div className="flex gap-1">
            <button
              className="bg-red-500 rounded text-white px-4"
              onClick={() => determineCounter("decrease")}
            >
              -
            </button>
            <p className="border rounded p-3">{counter}</p>
            <button
              className="bg-red-500 rounded text-white px-4"
              onClick={() => determineCounter("increase")}
            >
              +
            </button>
          </div>
          <div>
            <button className="border p-4 bg-red-500 rounded text-white">
              Buy Now
            </button>
          </div>
          <div>
            <button>
              <i
                className={`fa fa-heart border rounded bg-black-600 p-5 ${
                  likedColor === "black" ? "text-black-300" : "text-green-300"
                }`}
                aria-hidden="true"
                onClick={toggleLikedColor}
              ></i>
            </button>
          </div>
        </div>
        <div>
          <img src="/images/Frame 911.png" alt="product image" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
