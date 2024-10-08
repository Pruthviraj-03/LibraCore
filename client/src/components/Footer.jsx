import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const handleRefreshPage = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between px-6 pb-4 bg-white mobile:flex-col">
        <span
          onClick={handleRefreshPage}
          className="font-nunito text-xl font-bold text-gray-800 hover:text-gray-500 cursor-pointer"
        >
          LibraCore
        </span>

        <p className="font-nunito py-2 text-gray-800 mobile:text-sm">
          all rights reserved @https://github.com/Pruthviraj-03/
        </p>

        <div className="flex -mx-2">
          <Link
            to="#"
            className="mx-2 text-lg text-gray-800 hover:text-gray-500"
          >
            <FaFacebookF />
          </Link>

          <Link
            to="#"
            className="mx-2 text-lg text-gray-800 hover:text-gray-500"
          >
            <BsGithub />
          </Link>

          <Link
            to="#"
            className="mx-2 text-lg text-gray-800 hover:text-gray-500"
          >
            <BsTwitter />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
