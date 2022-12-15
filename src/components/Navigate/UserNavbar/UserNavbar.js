import React, { useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { baseUrl } from "../../../utils/baseUrl";
import {UserState} from '../../../context/UserContext'

export default function UserNavbar() {
  const navigate=useNavigate()
  const {User, setUser}=UserState()

  useEffect(()=>{
    getUser()
  },[])
 

  const getUser= async ()=>{
    try {
      const user = localStorage.getItem("Token");
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };
      const response=await axios.get(`${baseUrl}/api/client`,config)
      console.log(response);
      if (response.data){
        setUser(response.data)
      } {
        
      }
    } catch (error) {
      
    }
  }

  const logout=()=>{
    localStorage.clear()
    navigate('/login')
  }
  

    return (
        <div className="w-full">
          <div className="bg-gray-700 h-16 py-3 ">
            <div className="flex justify-between mx-20">
              <Link
              to={'/'}
                className="mr-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white "
              >
                <span>Free Work</span>
              </Link>
        
              <button
               onClick={logout}
                type="button"
                className="relative  inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white border-gray-200 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 "
              >
                <BiLogOut className="h-6 w-6 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    