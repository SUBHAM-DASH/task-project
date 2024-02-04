import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../service/auth.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SiContentful } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "28vw",
          }}
        >
          <div>
            <div className="mb-4">
              <SiContentful size={45} className="text-warning" />
              <h2 className="font-weight-bold" style={{ color: "#0d0c55" }}>
                Welcome
              </h2>
              <span>
                To keep connected with us please signup with your personal info
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="form-group mb-2">
                <label htmlFor="email" className="fw-bold">
                  Email
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 10, top: 8 }}>
                    <MdOutlineEmail size={24} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    style={{
                      outline: "none",
                      textIndent: 40,
                      padding: "10px 0px",
                    }}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-danger">{errors.email}</p>
                )}
              </div>

              <div className="form-group mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="password" className="fw-bold">
                    Password
                  </label>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 10, top: 8 }}>
                    <FaUnlock size={24} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    style={{
                      outline: "none",
                      textIndent: 40,
                      padding: "10px 0px",
                    }}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && touched.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </div>
              <div className="my-3">
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ background: "#0d0c55", color: "white" }}
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center text-sm-500 d-flex justify-content-between">
              <Link to="/pages/signup" style={{ fontSize: "14px",color: "#0d0c55" }}>
                Sign up
              </Link>
              <Link to="/pages/forgot-password" style={{ fontSize: "14px",color: "#0d0c55" }}>
                Forgot password
              </Link>
            </div>
          </div>{" "}
        </div>
        <div
          style={{
            textAlign: "right",
            width: "60vw",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="https://pbs.twimg.com/media/FE3zKEgWUAQo_-S.jpg"
            alt=""
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover", borderRadius: "270px 0px 0px 270px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
