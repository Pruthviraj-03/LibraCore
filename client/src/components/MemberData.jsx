import React from "react";
import { FaUserCircle } from "react-icons/fa";

const MemberData = () => {
  return (
    <div className="bg-gray-100 pt-8 flex justify-between px-48">
      <div className="flex flex-row gap-10">
        <FaUserCircle className="text-8xl text-gray-600 mt-5" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <h1 className="text-lg font-bold py-2">Full Name :</h1>
            <h1 className="text-lg py-2"></h1>
          </div>

          <div className="flex flex-row gap-3">
            <h1 className="text-lg font-bold py-2">Email ID :</h1>
            <h1 className="text-lg py-2"></h1>
          </div>

          <div className="flex flex-row gap-3">
            <h1 className="text-lg font-bold py-2">Registered Date :</h1>
            <h1 className="text-lg py-2"></h1>
          </div>
        </div>
      </div>
      <button
        className="bg-red-600 text-white font-nunito font-semibold p-2 h-10 text-sm rounded-md shadow-md mt-5 
                          mobile:text-base mobile:py-2 w-48 mobile:w-full hover:bg-white hover:text-red-600 cursor-pointer hover:border hover:border-black"
        type="button"
      >
        Delete Member
      </button>
    </div>
  );
};

export default MemberData;
