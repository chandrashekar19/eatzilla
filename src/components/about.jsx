/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const About = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Chandrashekar",
    location: "India",
    avatar_url: "/profile-picture.jpg", // Your image path in the public folder
  });

  useEffect(() => {
    console.log("Component Mounted");
    return () => {
      console.log("Component Will Unmount");
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 w-96 text-center">
        <img
          className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg mx-auto mt-6"
          src={userInfo.avatar_url}
          alt={userInfo.name}
        />
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-blue-800">
            {userInfo.name}
          </h2>
          <h3 className="text-lg text-gray-600 mt-2">{userInfo.location}</h3>
          <h4 className="text-sm text-gray-500 mt-4">
            Contact: @chandrashekar
          </h4>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Connect with Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
