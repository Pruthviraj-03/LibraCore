import React from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MemberData = ({ memberData }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/librarian/members/${memberData._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      navigate("/members");
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className="bg-gray-100 pt-8 flex justify-between px-48">
      <div className="flex flex-row gap-10">
        <FaUserCircle className="text-8xl text-gray-600 mt-5" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <h1 className="text-lg font-bold py-2">Full Name :</h1>
            <h1 className="text-lg py-2">{memberData.name}</h1>
          </div>

          <div className="flex flex-row gap-3">
            <h1 className="text-lg font-bold py-2">Email ID :</h1>
            <h1 className="text-lg py-2">{memberData.email}</h1>
          </div>

          <div className="flex flex-row gap-3">
            <h1 className="text-lg font-bold py-2">Registered Date :</h1>
            <h1 className="text-lg py-2">
              {new Date(memberData.createdAt).toLocaleDateString()}
            </h1>
          </div>
        </div>
      </div>
      <button
        className="bg-red-600 text-white font-nunito font-semibold p-2 h-10 text-sm rounded-md shadow-md mt-5 
                          mobile:text-base mobile:py-2 w-48 mobile:w-full hover:bg-white hover:text-red-600 cursor-pointer hover:border hover:border-black"
        type="button"
        onClick={handleDelete}
      >
        Delete Member
      </button>
    </div>
  );
};

export default MemberData;
