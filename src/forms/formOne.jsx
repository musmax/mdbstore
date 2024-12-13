import {Formik} from 'formik';
import * as Yup from 'yup';

const FormOne = () => {

    return (
      <div className="container">
        <Formik 
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          country: '',
          state: '',
          zip: '',
        }}
        // validate={values => {
        //   const errors = {};
        //   if (!values.firstname) {
        //     errors.firstname = 'Firstname is Required';
        //   }
        //   if (!values.lastname) {
        //     errors.lastname = 'Lastname is Required';
        //   }
        //   if (!values.email) {
        //     errors.email = 'Email is required'
        //   }
        //   else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
      validationSchema={Yup.object({
        firstname: Yup.string().max(5, 'First name is too long').required('Firstname is Required'),
        lastname: Yup.string().required('Lastname is Required'),
        email: Yup.string().email(),
      })}
        onSubmit={() => console.log('forms submitted successfully')}
        >
          {
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <div className="col-md-12 mt-5">
              <form onSubmit={handleSubmit}>
                <h4 className="mb-3">Personal information</h4>
        
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstname">First name</label>
                    <input type="text" 
                    className="form-control" 
                    id="firstname" 
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    />
                  </div>
                  {errors.firstname && touched.firstname ? <span>{errors.firstname}</span> : null}

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" 
                    className="form-control" 
                    id="lastname" 
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    />
                  </div>
                </div>
                {errors.lastname && touched.lastname ? <span>{errors.lastname}</span> : null}

                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" 
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  />
                </div>

                {errors.email && touched.lastname ? <span>{errors.email}</span> : null}
        
                {/* <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <select className="custom-select d-block w-100" id="country" 
                    name="country"
                    value={values.country}
                    >
                      <option value="">Choose...</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="NL">Netherlands</option>
                    </select>
                   
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">State</label>
                    <select className="custom-select d-block w-100" id="state" 
                    name="state"
                    value={values.state}
                    >
                      <option value="">Choose...</option>
                      <option value="california">California</option>
                      <option value="toronto">Toronto</option>
                      <option value="utrech">Utrech</option>
                    </select>
                   
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" id="zip" name="zip"
                    value={values.zip}
                    />
                  </div>
                </div> */}
        
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block" type="submit">
                  Submit
                </button>
              </form>
              </div>
            )
          }
        </Formik>
      </div>
    );

}

export default FormOne;