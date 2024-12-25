import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const carts = useSelector((state) => state.cart.cartList);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Your Cart
      </h1>

      {/* Cart Table */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-5">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm font-bold">
              <th className="py-3 px-5 text-left">Product</th>
              <th className="py-3 px-5 text-center">Image</th>
              <th className="py-3 px-5 text-center">Price</th>
              <th className="py-3 px-5 text-center">Quantity</th>
              <th className="py-3 px-5 text-center">Total</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {carts.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-all`}
              >
                <td className="py-4 px-5 text-gray-700">{item.name}</td>
                <td className="py-4 px-5 text-gray-700">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-10 h-10"
                  />
                </td>
                <td className="py-4 px-5 text-center text-gray-600">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-4 px-5 text-center text-gray-600">
                  {item.quantity}
                </td>
                <td className="py-4 px-5 text-center text-gray-800 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Price */}
        {carts.length > 0 && (
          <div className="text-right mt-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Grand Total: $
              {carts
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h2>
          </div>
        )}

        {/* Empty Cart Message */}
        {carts.length === 0 && (
          <div className="text-center py-10 text-gray-600">
            <p>Your cart is empty. Start adding products!</p>
          </div>
        )}
      </div>

      {/* Button Container */}
      <div className="flex justify-center mt-5">
        <button className="bg-red-500 text-white shadow-lg rounded-xl p-5">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;