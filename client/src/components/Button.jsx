import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, to }) => {
  return (
    <button
      className="bg-gray-800 text-white text-xl rounded-md shadow-xl px-4 py-1.5
                border border-white hover:bg-white hover:text-gray-800 hover:border hover:border-gray-800 mobile:px-4 mobile:py-2 mobile:text-sm"
      onClick={window.scrollTo(0, 0)}
    >
      <Link to={to}>{text}</Link>
    </button>
  );
};

export default Button;
