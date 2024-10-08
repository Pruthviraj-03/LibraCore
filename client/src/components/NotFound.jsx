import React from "react";
import notfound from "../Images/notfound.png";
import { Link } from "react-router-dom";
import Button from "./Button";

const NotFound = ({ search }) => {
  return (
    <div className="flex justify-center w-full h-screen my-12">
      <div className="flex items-center flex-col w-4/5 h-auto gap-7">
        <p className="font-nunito text-gray-800 text-lg">
          You searched for
          <span className="font-nunito text-gray-800 text-xl font-bold ml-2">
            {search}
          </span>
        </p>
        <div className="h-32 w-44 overflow-hidden">
          <img
            className="object-contain h-full w-full"
            src={notfound}
            alt="notfound-img"
          ></img>
        </div>
        <h1 className="font-nunito text-gray-800 text-xl font-500">
          We couldn't find any matches!
        </h1>
        <h2 className="font-nunito text-xl text-gray-800 text-15 font-bold">
          Please check the spelling or try searching something else
        </h2>
        <Button text="Go back to Home" to="/" />
      </div>
    </div>
  );
};

export default NotFound;
