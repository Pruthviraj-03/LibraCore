import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "./index";

const LimBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/member/me",
          { withCredentials: true }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/books/allbooks"
      );
      setBooks(res.data.data || []);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-100 py-10 tablet:pt-40 mobile:pt-10 laptop:pt-0">
      {loading ? (
        <Spinner />
      ) : (
        <div className="pc:container mx-auto flex flex-wrap gap-10 py-10">
          {books.slice(0, 8).map((curElem) => {
            const { title, author, description, image } = curElem;

            return (
              <div
                key={curElem.rank}
                className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl border"
              >
                <img
                  className="object-cover w-full h-48 mt-1"
                  src={image}
                  alt="books"
                />

                <div className="px-4 py-2 h-72">
                  <h1 className="text-3xl font-bold text-gray-800 uppercase">
                    {title}
                  </h1>
                  <h1 className="text-lg font-bold py-2">Author: {author}</h1>
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                </div>

                {userData && userData.role === "members" && (
                  <div className="cursor-pointer flex items-center justify-center px-4 py-5 hover:text-gray-900 bg-gray-900 text-white hover:bg-white hover:border hover:border-t-gray-200 transition-colors duration-300">
                    <span className="text-2xl">BORROW BOOK</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex items-center justify-center h-auto w-full">
        <Button text="View more Books ..." to="/books" />
      </div>
    </div>
  );
};

export default LimBooks;
