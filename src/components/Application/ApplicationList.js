import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";

export default function ApplicationList() {
  const [applications, setpplications] = useState();
  const { id } = useParams();

  useEffect(() => {
    getApplications(id);
  }, []);

  const getApplications = async (postid) => {
    try {
      const user = localStorage.getItem("client");
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };
      const response = await axios.get(
        `${baseUrl}/api/application/${postid}`,
        config
      );

      if (response.data) {
        setpplications(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(applications);
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mt-4">All Applications</h1>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((item, index) => (
              <>
                <tr key={item.Id} className="bg-white ">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td scope="row" className="py-4 px-6 font-medium ">
                    {item?.name}
                  </td>
                  <td className="py-4 px-6">{item?.phone}</td>
                  <td className="py-4 px-6">{item?.userId?.email}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
