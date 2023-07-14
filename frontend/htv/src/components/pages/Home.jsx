import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center text-4xl h-screen">
      <h1 className="font-extrabold my-8 hover:cursor-default">
        Welcome to HTVisions
      </h1>
      <div className="flex space-x-6">
        <button className="border-black border-4 rounded-2xl bg-black text-white p-3 hover:bg-white hover:text-black">
          <Link to="/login">Login</Link>
        </button>
        <button className="hover:border-black border-4 rounded-2xl p-3 border-transparent">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
