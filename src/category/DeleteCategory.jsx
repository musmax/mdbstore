import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editCategory, getCategory } from '../redux/categorySlice';
import PopUp from '../components/PopUp';

const DeleteCategory = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await dispatch(getCategory(id));
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
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <PopUp show={showPopUp} onClose={handlePopUpClose} title="Success">
          Category edited successfully!
        </PopUp>
      </div>
    </div>
  );
};

export default DeleteCategory;
