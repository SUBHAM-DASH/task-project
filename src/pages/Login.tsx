import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../service/auth.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginSideImage from "../images/loginImage.jpg";

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .nullable()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, touched, errors, submitForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidationSchema,
      validateOnMount: true,
      onSubmit: (values: any, action: any) => {
        loginUser(values)
          .then((response) => {
            localStorage.setItem("task-token", response?.data?.token);
            toast.success(response?.data?.message, {
              position: "top-right",
              autoClose: 1000,
            });
            action.resetForm();
            navigate("/pages/dashboard");
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
      <div className="paddin">
        <div className="d-flex justify-content-center align-items-center gap-5">
          <div className=" py-4" style={{width:"30%",height:"40%"}}>
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
                    Sign in to your account
                  </h2>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                >
                  <div className="form-group mb-2">
                    <label htmlFor="email" className="fw-bold">Email address</label>
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

                  <div className="form-group mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="fw-bold">Password</label>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control border border-1 border-dark"
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
                <div className="text-center text-sm text-gray-500 d-flex justify-content-between">
                  <Link
                    to="/pages/forgot-password"
                    style={{ fontSize: "14px" }}
                  >
                    Forgot password
                  </Link>
                  <Link to="/pages/signup" style={{ fontSize: "14px" }}>
                    Sign up
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

export default Login;
