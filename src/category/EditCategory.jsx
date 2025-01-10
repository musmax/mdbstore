import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editCategory, getCategory } from '../redux/categorySlice';
import PopUp from '../components/PopUp';

const EditCategory = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log("Fetching category with ID:", typeof id);
        const result = await dispatch(getCategory(id));
        console.log(result);
        setCategory(result.payload.data); // Pre-fill form with fetched data
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    };

    fetchCategory();
  }, [id, dispatch]);

  const handlePopUpClose = () => {
    setShowPopUp(false);
    navigate('/categories');
  };

  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Edit Category
        </h1>
        <Formik
          initialValues={{
            name: category.name || '',
            description: category.description || '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, 'Name must be at least 3 characters long')
              .required('Name is required'),
            description: Yup.string()
              .min(10, 'Description must be at least 10 characters long')
              .required('Description is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
                console.log(values);
              await dispatch(editCategory({ id, categoryData: values }));
              setShowPopUp(true); // Show success popup
            } catch (error) {
              console.error('Category update failed:', error);
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
                  className="border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-4 py-2"
                  placeholder="Enter category name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

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
                  className="border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-4 py-2 h-28 resize-none"
                  placeholder="Enter category description"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Update Category'}
                </button>
              </div>
            </form>
          )}
        </Formik>
        <PopUp show={showPopUp} onClose={handlePopUpClose} title="Success">
          Category edited successfully!
        </PopUp>
      </div>
    </div>
  );
};

export default EditCategory;
