import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signupUser } from "../service/auth.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SiContentful } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

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
                To keep connected with us please signup with your info
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="form-group mb-2">
                <label htmlFor="name" className="fw-bold">
                  Name
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 10, top: 8 }}>
                    <FaUser size={24} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control border border-1 border-dark"
                    placeholder="Enter name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    style={{
                      outline: "none",
                      textIndent: 40,
                      padding: "10px 0px",
                    }}
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="text-danger">{errors.name}</p>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email" className="fw-bold">
                  Email
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 10, top: 8 }}>
                    <MdEmail size={24} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control border border-1 border-dark"
                    placeholder="Enter email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    style={{
                      outline: "none",
                      textIndent: 40,
                      padding: "10px 0px",
                    }}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-danger">{errors.email}</p>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="phoneNumber" className="fw-bold">
                  Phone
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 10, top: 8 }}>
                    <FaPhone size={24} />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="form-control border border-1 border-dark"
                    placeholder="123-456-7890"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    style={{
                      outline: "none",
                      textIndent: 40,
                      padding: "10px 0px",
                    }}
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-danger">{errors.phoneNumber}</p>
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
                    className="form-control border border-1 border-dark"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    style={{
                      outline: "none",
                      textIndent: 40,
                      padding: "10px 0px",
                    }}
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
            <div className="text-center text-sm-500 d-flex justify-content-end">
              <Link
                to="/pages/login"
                style={{ fontSize: "14px", color: "#0d0c55" }}
              >
                Sign in
              </Link>
            </div>
          </div>
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

export default Signup;
