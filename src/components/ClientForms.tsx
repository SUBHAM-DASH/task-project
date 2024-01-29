import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addClientDetails,
  editClientDetails,
} from "../service/clientRequest.ts";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  designation: Yup.string().required("Designation is required"),
  country: Yup.string().required("Country is required"),
  industry: Yup.string().required("Industry is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Invalid phone number")
    .required("Phone number is required"),
  website: Yup.string().required("Website is required"),
  linkedin: Yup.string().required("LinkedIn is required"),
});

const ClientForms = ({ isEdit, clientInfo, handleClose=()=>{} }) => {
  const token = localStorage.getItem("task-token");
  const initialValues = {
    name: isEdit ? clientInfo?.name : "",
    designation: isEdit ? clientInfo?.designation : "",
    country: isEdit ? clientInfo?.country : "",
    industry: isEdit ? clientInfo?.industry : "",
    emailId: isEdit ? clientInfo?.emailid : "",
    phoneNumber: isEdit ? clientInfo?.phonenumber : "",
    website: isEdit ? clientInfo?.website : "",
    linkedin: isEdit ? clientInfo?.linkedin : "",
  };
  const { values, errors, touched, handleChange, handleBlur, submitForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      validateOnMount: true,
      onSubmit: (values, action) => {
        if (isEdit) {
          // edit
          const data = {
            ...values,
            id: clientInfo?.id,
          };
          editClientDetails(token, data)
            .then((response) => {
              toast.success(response?.data?.message, { autoClose: 1000 });
              action.resetForm();
              handleClose();
            })
            .catch((error) => {
              toast.error(error.response?.data?.message, { autoClose: 1000 });
            });
        } else {
          // add
          addClientDetails(token, values)
            .then((response) => {
              toast.success(response?.data?.message, { autoClose: 1000 });
              action.resetForm();
            })
            .catch((error) => {
              toast.error(error.response?.data?.message, { autoClose: 1000 });
            });
        }
      },
    });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.name}
            />
            {touched.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Designation</label>
            <input
              type="text"
              placeholder="Designation"
              className="form-control"
              name="designation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.designation}
            />
            {touched.designation && (
              <span className="text-danger">{errors.designation}</span>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="form-control"
              name="country"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.country}
            />
            {touched.country && (
              <span className="text-danger">{errors.country}</span>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Industry</label>
            <input
              type="text"
              placeholder="Industry"
              className="form-control"
              name="industry"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.industry}
            />
            {touched.industry && (
              <span className="text-danger">{errors.industry}</span>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control"
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.phoneNumber}
            />
            {touched.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Email Id</label>
            <input
              type="email"
              placeholder="Email Id"
              className="form-control"
              name="emailId"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.emailId}
            />
            {touched.emailId && (
              <span className="text-danger">{errors.emailId}</span>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Website</label>
            <input
              type="text"
              placeholder="Website"
              className="form-control"
              name="website"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.website}
            />
            {touched.website && (
              <span className="text-danger">{errors.website}</span>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label fw-bold">Linkedin</label>
            <input
              type="text"
              placeholder="Linkedin"
              className="form-control"
              name="linkedin"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.linkedin}
            />
            {touched.linkedin && (
              <span className="text-danger">{errors.linkedin}</span>
            )}
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary btn-sm" type="submit">
            {isEdit ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForms;
