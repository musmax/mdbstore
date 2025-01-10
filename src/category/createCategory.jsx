import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createCategory } from '../redux/categorySlice';
import PopUp from '../components/PopUp';
import { useNavigate } from 'react-router-dom';

const formStyle =
  'border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-4 py-2';

const CreateCategory = () => {
  const dispatchCategory = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  const handlePopUpClose = () => {
    setShowPopUp(false);
    navigate('/categories');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Category management
        </h1>
        <Formik
          initialValues={{
            name: '',
            icon: '',
            description: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, 'Name must be at least 3 characters long')
              .required('Category name is required'),
            icon: Yup.string()
              .url('Invalid URL format')
              .required('Icon URL is required'),
            description: Yup.string()
              .min(10, 'Description must be at least 10 characters long')
              .required('Description is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              console.log(values);
              dispatchCategory(createCategory(values));
              setShowPopUp(true); // Show the pop-up
              resetForm(); // Reset the form fields
            } catch (error) {
              console.error('Category creation failed:', error);
            }
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-medium mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="Enter category name"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                ) : null}
              </div>

              {/* Icon URL */}
              <div>
                <label
                  htmlFor="icon"
                  className="block text-gray-600 font-medium mb-1"
                >
                  Category Icon URL
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={values.icon}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="Enter category icon URL"
                />
                {errors.icon && touched.icon ? (
                  <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
                ) : null}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-600 font-medium mb-4"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${formStyle} h-28 resize-none`}
                  placeholder="Enter category description"
                />
                {errors.description && touched.description ? (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                ) : null}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Create Category'}
                </button>
              </div>
            </form>
          )}
        </Formik>

        {/* Popup Component */}
        <PopUp
          show={showPopUp}
          onClose={handlePopUpClose}
          title="Success"
        >
          Category created successfully!
        </PopUp>
      </div>
    </div>
  );
};

export default CreateCategory;
