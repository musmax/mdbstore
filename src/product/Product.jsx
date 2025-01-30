import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  viewProducts,
  editProduct,
  deleteProduct,
} from "../redux/productSlice";

const Product = () => {
  const dispatchProduct = useDispatch();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Keep track of user input
  const [debouncedTerm, setDebouncedTerm] = useState(""); // Debounced search term

  // Fetch all products on component mount
  useEffect(() => {
    viewProducts();
  }, []);

  // Fetch products with an optional query
  const fetchProducts = async (query = "") => {
    try {
      const result = await dispatchProduct(viewProducts(query));
      console.log("products fetched successfully:", result.payload);
      setProducts(result.payload.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Update the debounced search term with a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler); // Cleanup the timeout on every change
    };
  }, [searchTerm]);

  // Fetch products whenever the debounced term changes
  useEffect(() => {
    const query = debouncedTerm
      ? `?name=${encodeURIComponent(debouncedTerm)}`
      : "";
    fetchProducts(query);
  }, [debouncedTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatchProduct(deleteCategory(id));
        alert("product deleted successfully!");
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">products</h1>
        <Link to="/add-product">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add product
          </button>
        </Link>
      </div>
      {/* Search Input */}
      <div className="mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-center">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                product Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                availableQuantity
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Discount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.availableQuantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.discount}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link to={`/product/edit/${product.id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
