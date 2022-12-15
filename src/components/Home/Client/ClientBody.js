import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";


export default function ClientBody() {

  const [posts, setPost] = useState();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async (data) => {
    try {
      const user = localStorage.getItem("client");
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };

      const response = await axios.get(`${baseUrl}/api/project/get-project`, config);
      console.log(response.data);
      if (response.data) {
        setPost(response.data);
        console.log(user);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // console.log(posts.length());
  return (
    <div>
      {posts?.length > 0 ? 
      ( <><h1 className="font-bold text-2xl text-center mt-4">My Posts</h1>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Project name
              </th>
              <th scope="col" className="py-3 px-6">
                Technology
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                No of Applications
              </th>
              <th scope="col" className="py-3 px-6">
                who applied
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((item, index) => (
              <>
                <tr className="bg-white ">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td scope="row" className="py-4 px-6 font-medium ">
                    {item?.projectName}
                  </td>
                  <td className="py-4 px-6">{item?.technology}</td>
                  <td className="py-4 px-6">{item?.price}</td>
                  <td className="py-4 px-6">0</td>
                  <td className="py-4 px-6">
                  <Link
                        to={`/applications/${item?._id}`}
                      
                      
                     
                      className="font-medium text-blue-600 dark:text-blue-500 h"
                    >
                      VIEW
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div></> ) :<>
      <div>
        <h1 className="text-center text-3xl mt-5 font-bold">Add your work here</h1></div></>}
    </div>
  );
}
