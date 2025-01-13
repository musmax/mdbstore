import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

const formStyle =
  "border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-4 py-2";

const CreateProduct = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  const handlePopUpClose = () => {
    setShowPopUp(false);
    navigate("/products");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Product Management
        </h1>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            availableColors: [""],
            availableSizes: [""],
            availableQuantity: "",
            discount: "",
            categoriesId: [""],
            productImages: [{ url: "" }],
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Product name must be at least 3 characters long")
              .required("Product name is required"),
            description: Yup.string()
              .min(10, "Description must be at least 10 characters long")
              .required("Description is required"),
            price: Yup.number()
              .positive("Price must be greater than zero")
              .required("Price is required"),
            availableColors: Yup.array()
              .of(Yup.string().required("Color is required"))
              .min(1, "At least one color is required"),
            availableSizes: Yup.array()
              .of(Yup.string().required("Size is required"))
              .min(1, "At least one size is required"),
            availableQuantity: Yup.number()
              .integer("Quantity must be an integer")
              .positive("Quantity must be greater than zero")
              .required("Quantity is required"),
            discount: Yup.number()
              .integer("Discount must be an integer")
              .min(0, "Discount cannot be negative")
              .max(100, "Discount cannot exceed 100"),
            categoriesId: Yup.array()
              .of(Yup.string().required("Category is required"))
              .min(1, "At least one category is required"),
            productImages: Yup.array()
              .of(
                Yup.object().shape({
                  url: Yup.string()
                    .url("Invalid URL format")
                    .required("Image URL is required"),
                })
              )
              .min(1, "At least one image is required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values);
            setShowPopUp(true);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="Enter product name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${formStyle} h-20 resize-none`}
                  placeholder="Enter product description"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="Enter product price"
                />
                {errors.price && touched.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* Available Colors */}
              <FieldArray
                name="availableColors"
                render={(arrayHelpers) => (
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Available Colors
                    </label>
                    {values.availableColors.map((color, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={color}
                          onChange={(e) =>
                            arrayHelpers.replace(index, e.target.value)
                          }
                          className={formStyle}
                          placeholder={`Color ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="text-blue-500"
                    >
                      Add Color
                    </button>
                  </div>
                )}
              />

              {/* Available Sizes */}
              <FieldArray
                name="availableSizes"
                render={(arrayHelpers) => (
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Available Sizes
                    </label>
                    {values.availableSizes.map((size, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={size}
                          onChange={(e) =>
                            arrayHelpers.replace(index, e.target.value)
                          }
                          className={formStyle}
                          placeholder={`Size ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="text-blue-500"
                    >
                      Add Size
                    </button>
                  </div>
                )}
              />

              {/* Product Images */}
              <FieldArray
                name="productImages"
                render={(arrayHelpers) => (
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Product Images
                    </label>
                    {values.productImages.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) =>
                            arrayHelpers.replace(index, { url: e.target.value })
                          }
                          className={formStyle}
                          placeholder={`Image URL ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({ url: "" })}
                      className="text-blue-500"
                    >
                      Add Image
                    </button>
                  </div>
                )}
              />

              {/* Categories */}
              <FieldArray
                name="categoriesId"
                render={(arrayHelpers) => (
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Categories
                    </label>
                    {values.categoriesId.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={category}
                          onChange={(e) =>
                            arrayHelpers.replace(index, e.target.value)
                          }
                          className={formStyle}
                          placeholder={`Category ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="text-blue-500"
                    >
                      Add Category
                    </button>
                  </div>
                )}
              />

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>

        {showPopUp && (
          <PopUp
            title="Success"
            message="Product created successfully!"
            onClose={handlePopUpClose}
          />
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
