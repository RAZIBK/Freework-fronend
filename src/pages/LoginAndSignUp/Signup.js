import React from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-hot-toast";

const formikSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Invalid email format"
  ).required("Email is required"),
  password: Yup.string().required("password is required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signup(values);
    },
    validationSchema: formikSchema,
  });

  const signup = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/register`,
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const user = localStorage.getItem("Token");
  const client = localStorage.getItem("client");

  if(user){
    return   <Navigate to="/" />;
  }else if(client){
  return   <Navigate to="/client" />;
  }

  return (
    <div className="bg-slate-100 h-screen grid justify-items-stretch">
      <div className=" justify-self-center self-center w-full max-w-md">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h3 className="text-center font-bold">Sign Up</h3>
          <div className="mb-4 mt-4">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              type="text"
              placeholder="Name"
            />
            <div className="mt-2 text-red-400 mb-2">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>

          <div className="mb-4 mt-4">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              type="text"
              placeholder="Email"
            />
            <div className="mt-2 text-red-400 mb-2">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className="mb-4 mt-4">
            <label
              for=""
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              type="password"
              placeholder="Password"
            />
            <div className="mt-2 text-red-400 mb-2">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
