import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .required("Email is required")
    .email("Invalid email format"),
});

const Forgotpassword = () => {
  const { values, handleBlur, handleChange, touched, errors, submitForm } =
    useFormik({
      initialValues: {
        email: ""
      },
      validationSchema: ForgotPasswordValidationSchema,
      validateOnMount: true,
      onSubmit: (values, action) => {
        console.log(values);
      },
    });

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="card py-4" style={{ width: "40%" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="col-md-12">
                <div className="text-center mb-4">
                  <img
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                    className="mb-2"
                    height="30"
                  />
                  <h2 className="h4 font-weight-bold">
                    Reset account password
                  </h2>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control border border-1 border-dark"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </div>
                  <div className="my-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Reset Password
                    </button>
                  </div>
                </form>
                <div className="text-center text-sm text-gray-500 d-flex justify-content-between">
                  <Link to="/pages/login" style={{ fontSize: "14px" }}>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
