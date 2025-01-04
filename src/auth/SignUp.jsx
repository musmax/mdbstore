import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {register} from '../redux/authSlice';

const formStyle =
  'border-x-0 border-t-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-0';

const SignUp = () => {
  const registerChecker = useSelector((state) => state.auth.isAuthenticated);
  const authDispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .max(15, 'First name is too long')
            .required('Firstname is required'),
          lastname: Yup.string().required('Lastname is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
            .required('Password is required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log('Form submitted successfully:', values);
            await authDispatch(register(values)).unwrap();
            console.log('Registration successful, navigating...');
            navigate('/registration-successful');
          } catch (error) {
            console.error('Registration failed:', error);
          } finally {
            setSubmitting(false);
          }
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
          <div className="grid grid-cols-[55%_35%] gap-12 product-container justify-between">
            {/* Left side image */}
            <div>
              <img
              src="/images/Side Image.png"
              alt="Sign up illustration"
              />
            </div>

            {/* Right side form */}
            <div className="py-20">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 px-10"
              >
                <p>Enter your details below</p>

                {/* First Name */}
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="First Name"
                />
                {errors.firstname && touched.firstname ? (
                  <span className="text-red-500">{errors.firstname}</span>
                ) : null}

                {/* Last Name */}
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="Last Name"
                />
                {errors.lastname && touched.lastname ? (
                  <span className="text-red-500">{errors.lastname}</span>
                ) : null}

                {/* phoneNumber */}
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="080xx123984"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <span className="text-red-500">{errors.phoneNumber}</span>
                ) : null}
                {/* Username */}
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="example_username"
                />
                {errors.username && touched.username ? (
                  <span className="text-red-500">{errors.username}</span>
                ) : null}

                {/* Email */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formStyle}
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <span className="text-red-500">{errors.email}</span>
                ) : null}

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${formStyle} w-full`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && touched.password ? (
                  <span className="text-red-500">{errors.password}</span>
                ) : null}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit bg-red-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>

              {/* Additional Links */}
              <div className="pt-10 flex flex-col items-center gap-5">
                <div className="w-52">
                  <Link to="/">
                    <img
                      src="/images/Google Sign up.png"
                      alt="Google Signup"
                    />
                  </Link>
                </div>
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
