import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "./index";
import { FiSearch } from "react-icons/fi";

const ReturnHistory = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-900 text-4xl font-nunito">
            RETURNED HISTORY
          </span>
          <div className="pc:container flex mx-auto mobile:m-2 pt-10">
            <FiSearch className="text-4xl m-auto relative left-10 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400
                    rounded-md focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div className="pc:container mx-auto flex flex-wrap gap-10 py-10">
            {books
              .slice(0, 4)
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((curElem) => {
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
                      <h1 className="text-lg font-bold py-2">
                        Author: {author}
                      </h1>
                      <p className="mt-1 text-sm text-gray-600">
                        {description}
                      </p>
                      <h1 className="text-lg font-bold py-2">
                        Date: 25th September, 2024
                      </h1>
                    </div>

                    <div className="cursor-pointer flex items-center justify-center px-4 py-5 hover:text-gray-900 bg-gray-900 text-white hover:bg-white hover:border hover:border-t-gray-200 transition-colors duration-300">
                      <span className="text-2xl">BORROW BOOK</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnHistory;
