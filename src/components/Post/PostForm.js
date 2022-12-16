import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-hot-toast";

const formikSchema = Yup.object({
  projectName: Yup.string().required("Project Name is required"),
  technology: Yup.string().required("Technologys is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Price is required"),
  duration: Yup.string().required("Duration is required"),
});
export default function PostForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      projectName: "",
      technology: "",
      description: "",
      price: "",
      duration: "",
    },
    onSubmit: (values) => {
      createPost(values);
    },
    validationSchema: formikSchema,
  });

  const createPost = async (data) => {
    try {
      const user = localStorage.getItem("client");
      console.log(user);
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };

      const response = await axios.post(`${baseUrl}/api/project`, data, config);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/client");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-slate-100 h-min-screen grid justify-items-stretch">
        <div className=" justify-self-center w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black-300">
            Create Post
          </h2>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Name
                  </label>
                  <div className="mt-1">
                    {/* Title */}
                    <input
                      value={formik.values.projectName}
                      onChange={formik.handleChange("projectName")}
                      onBlur={formik.handleBlur("projectName")}
                      id="projectName"
                      name="projectName"
                      type="text"
                      autoComplete="projectName"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik?.touched?.projectName &&
                      formik?.errors?.projectName}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Technology Used
                  </label>
                  <div className="mt-1">
                    {/* Title */}
                    <input
                      value={formik.values.technology}
                      onChange={formik.handleChange("technology")}
                      onBlur={formik.handleBlur("technology")}
                      id="technology"
                      name="technology"
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik?.touched?.technology && formik?.errors?.technology}
                  </div>
                </div>{" "}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="mt-1">
                    {/* Title */}
                    <input
                      value={formik.values.price}
                      onChange={formik.handleChange("price")}
                      onBlur={formik.handleBlur("price")}
                      id="price"
                      name="price"
                      type="number"
                      autoComplete="price"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik?.touched?.price && formik?.errors?.price}
                  </div>
                </div>{" "}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (In days)
                  </label>
                  <div className="mt-1">
                    {/* Title */}
                    <input
                      value={formik.values.duration}
                      onChange={formik.handleChange("duration")}
                      onBlur={formik.handleBlur("duration")}
                      id="duration"
                      name="duration"
                      type="number"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik?.touched?.duration && formik?.errors?.duration}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  {/* Description */}
                  <textarea
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    rows="5"
                    cols="10"
                    className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                    type="text"
                  ></textarea>
                  <div className="text-red-500">
                    {formik?.touched?.description && formik.errors?.description}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

          
      </div> */}
    </>
  );
}
