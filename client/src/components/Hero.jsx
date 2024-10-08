import React from "react";
import bookHero from "../Images/bookHero.jpg";
import Button from "./Button";

const Hero = () => {
  return (
    <>
      <div
        className="flex tablet:flex-col tablet:h-auto mobile:flex-col mobile:h-auto"
        style={{ height: "80vh" }}
      >
        <div className="bg-gray-900 w-full flex justify-center items-center">
          <img
            src={bookHero}
            alt="books"
            style={{ height: "70%" }}
            className="rounded-lg rotateImg"
          />
        </div>

        <div className="bg-gray-400 tablet:py-32 mobile:py-10 w-full flex justify-start items-center">
          <div>
            <p className="font-nunito overflow-hidden font-bold text-4xl mx-4 line-to-animate animation-typewriter laptop:text-3xl mobile:text-17">
              BEST PLACE TO CHOOSE YOUR BOOKS
            </p>
            <p className="font-semibold text-xl ml-4 mr-40 my-3 mobile:hidden">
              “The more that you read, the more things you will know. The more
              that you learn, the more places youll go.”
            </p>
            <p className="font-semibold text-xl mx-4 my-2 mobile:text-base mobile:my-0">
              Find and Read your Favourite Books easily.
            </p>
            <div className="my-5 mx-7 mobile:mx-4">
              <Button text="Find Now" to="/books" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
