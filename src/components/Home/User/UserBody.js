import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import Applicationform from "../../Application/Applicationform";

export default function ClientBody() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPost] = useState();
  const [applications, setApplications] = useState();
  const [formId, setformId] = useState();

  useEffect(() => {
    getAllPosts();
    myapplications()
  }, [showModal]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/project`);
      if (response?.data) {
        setPost(response?.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const myapplications = async (data) => {
    try {
      const user = localStorage.getItem("Token");
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };
      const response = await axios.get(
        `${baseUrl}/api/application`,
        config
      );
      if (response.data) {
        setApplications(response.data)
      } 
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className="mt-5">
      {posts?.map((item) => (
        <div class="max-w-6xl p-6 mx-auto mt-5 bg-white border border-gray-200 rounded-lg shadow-md ">
          <div className="flex justify-between">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-700 ">
              {item.projectName}
            </h5>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-red-700 ">
              $ {item.price}
            </h5>
          </div>
          <p class="mb-3 font-bold text-gray-900">
            <span className="text-sm font-bold">Description : </span>

            {item.description}
          </p>
          <p class="mb-3 font-bold text-gray-900">
            <span className="text-sm font-bold">Tools : </span>

            {item.technology}
          </p>
          <p class="mb-3 font-bold text-gray-900 ">
            <span className="text-sm font-bold">Duration : </span>
            {item.duration} days
          </p>
          <div className="flex justify-end">
            {applications?.some(i => i?.projectId.includes(item?._id)) ? (
              <><button
             
              class="inline-flex  px-3 py-2 text-sm font-medium text-center text-green-400  rounded-lg"
            >
              Applied
            </button></> 
            ):  <button
            onClick={() => {
              setShowModal(true);
              setformId(item._id);
            }}
            class="inline-flex  px-3 py-2 text-sm font-medium text-center text-black bg-gray-100 rounded-lg"
          >
            Apply
          </button>}
          </div>
        </div>
      ))}
      <Applicationform
        visible={showModal}
        onClose={() => setShowModal(false)}
        formId={formId}
      />
    </div>
  );
}
