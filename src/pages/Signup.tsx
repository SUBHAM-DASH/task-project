import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signupUser } from "../service/auth.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, submitForm } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
      },
      validationSchema: SignupValidationSchema,
      validateOnMount: true,
      onSubmit: (values: any, action: any) => {
        signupUser(values)
          .then((response) => {
            toast.success(response?.data?.message, {
              position: "top-right",
              autoClose: 1000,
            });
            navigate("/pages/login");
            action.resetForm();
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message, {
              position: "top-right",
              autoClose: 1000,
            });
          });
      },
    });

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className="py-4" style={{ width: "40%" }}>
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
                    Sign up to your account
                  </h2>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  <div className="form-group mb-2">
                    <label htmlFor="name" className="fw-bold">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control border border-1 border-dark"
                      placeholder="Enter name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="email" className="fw-bold">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control border border-1 border-dark"
                      placeholder="Enter email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="phoneNumber" className="fw-bold">Phone number</label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="form-control border border-1 border-dark"
                      placeholder="123-456-7890"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <p className="text-danger">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="fw-bold">Password</label>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control border border-1 border-dark"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                  </div>

                  <div className="my-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="text-center text-sm text-gray-500 d-flex justify-content-end">
                  <Link to="/pages/login" style={{ fontSize: "14px" }}>
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src="https://pbs.twimg.com/media/FE3zKEgWUAQo_-S.jpg" alt="" width={600} height={550}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
