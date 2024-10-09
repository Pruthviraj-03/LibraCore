import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Button = ({ text, to }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "libra-core-api.vercel.app/api/v1/users/me",
          { withCredentials: true }
        );
        setUserData(response.data.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Link
      to={userData ? to : "/login"}
      className="bg-gray-800 text-white text-xl rounded-md shadow-xl px-4 py-1.5
                border border-white hover:bg-white hover:text-gray-800 hover:border hover:border-gray-800 mobile:px-4 mobile:py-2 mobile:text-sm"
      onClick={() => window.scrollTo(0, 0)}
    >
      {text}
    </Link>
  );
};

export default Button;
