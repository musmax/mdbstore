import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, viewCategories } from '../redux/categorySlice';

const Category = () => {
  const dispatchCategory = useDispatch();

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Keep track of user input
  const [debouncedTerm, setDebouncedTerm] = useState(""); // Debounced search term

    // Fetch all categories on component mount
    useEffect(() => {
      fetchCategories();
    }, []);


  // Fetch categories with an optional query
  const fetchCategories = async (query = "") => {
    try {
      const result = await dispatchCategory(viewCategories(query));
      console.log("Categories fetched successfully:", result.payload);
      setCategories(result.payload.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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

  // Fetch categories whenever the debounced term changes
  useEffect(() => {
    const query = debouncedTerm ? `?name=${encodeURIComponent(debouncedTerm)}` : "";
    fetchCategories(query);
  }, [debouncedTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatchCategory(deleteCategory(id));
        alert("Category deleted successfully!");
      } catch (error) {
        alert("Failed to delete category");
      }
    }
  };
  
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link to='/category-form'>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Category
          </button>
        </Link>
      </div>
      {/* Search Input */}
      <div className="mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search categories..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Icon</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{category.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2">{category.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{category.icon}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
              <Link to={`/category/edit/${category.id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                  Edit
                </button>
              </Link>
              <button 
              onClick={() => handleDelete(category.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
