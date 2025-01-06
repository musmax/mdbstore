import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../redux/authSlice'
import { useDispatch } from 'react-redux';

const formStyle =
  'border-x-0 border-t-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-0';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatchLogin = useDispatch();

  function setAdminREendering () {
    setRenderAdminPage(!renderAdminPage);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
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
          // lets talk to the BE now
          try {
            console.log(values);
            dispatchLogin(login(values));
            // navigate('/');
          } catch (error) {
            console.error('Login failed:', error);
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
                  <i className="fa fa-google" aria-hidden="true"></i>
                  </Link>
                </div>
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-500">
                    Register
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

export default Login;
