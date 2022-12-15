import React from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../utils/baseUrl";

const formikSchema = Yup.object({
  name: Yup.string().required("name is required"),
  phone: Yup.string().required("password is required"),
});

export default function Applicationform({
  children,
  visible,
  onClose,
  formId,
}) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values, { resetForm }) => {
      application(values);
      resetForm({ values: "" });
    },
    validationSchema: formikSchema,
  });

  const application = async (data) => {
    try {
      const user = localStorage.getItem("Token");
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };
      const response = await axios.post(
        `${baseUrl}/api/application`,
        { ...data, projectId: formId },
        config
      );
      if (response.data) {
        toast.success(response.data.message);

        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!visible) return null;
  const handleOnBackDropClick = (e) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  return (
    <>
      <div
        id="backdrop"
        onClick={handleOnBackDropClick}
        className="justify-center items-center flex  fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="bg-slate-100 grid justify-items-stretch">
          <div className=" justify-self-center self-center w-full max-w-md">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded px-8 pt-6 pb-8 mb-4"
            >
              <h3 className="text-center font-bold">Application Form</h3>

              <div className="mb-4 mt-4">
                <label
                  for=""
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800"
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
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 l"
                  value={formik.values.phone}
                  onChange={formik.handleChange("phone")}
                  onBlur={formik.handleBlur("phone")}
                  type="Number"
                  placeholder="phone"
                />
                <div className="mt-2 text-red-400 mb-2">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>
    </>
  );
}
