import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();

  const handleRefreshPage = () => {
    navigate("/");
    window.location.reload();
  };

  const handleBooksRefreshPage = () => {
    navigate("/books");
    window.location.reload();
  };

  return (
    <div>
      <div className="bg-white shadow w-full px-44 laptop:px-16 tablet:px-1 mobile:px-0">
        <div className="px-6 py-3 flex items-center justify-between mobile:px-3 mobile:w-screen">
          <div className="flex items-center gap-2">
            <span
              className="font-nunito text-3xl font-bold text-gray-800 hover:text-gray-500 cursor-pointer mobile:text-lg"
              onClick={handleRefreshPage}
            >
              LibraCore
            </span>

            <div className="flex items-center ml-5 gap-5 mobile:ml-0 mobile:gap-1">
              <Link
                to="/"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
                onClick={handleRefreshPage}
              >
                Home
              </Link>

              <Link
                to="/books"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
                onClick={handleBooksRefreshPage}
              >
                All Books
              </Link>

              <Link
                to="/members"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
              >
                All Members
              </Link>

              <Link
                to="/history"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
              >
                History
              </Link>
            </div>
          </div>
          <Button to="/login" text="Login" />
          <Button to="/profile" text="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;
