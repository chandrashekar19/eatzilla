import { useState, useEffect } from "react";

const About = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Chandrashekar",
    location: "Default",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("https://api.github.com/users/akshaymarch7");
      const data = await response.json();
      setUserInfo(data);
    };

    fetchUserData();

    return () => {
      console.log("Component Will Unmount");
    };
  }, []);

  //  bg-gradient-to-r from-blue-500 to-green-400

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-white">
      <div className="bg-blue-800  backdrop-blur-lg shadow-lg rounded-2xl p-6 text-center w-96">
        <img
          className="w-28 h-28 rounded-full border-4 border-white shadow-md mx-auto"
          src={userInfo.avatar_url}
          alt={userInfo.name}
        />
        <h2 className="text-xl font-bold text-white mt-4">{userInfo.name}</h2>
        <h3 className="text-gray-200">{userInfo.location}</h3>
        <h4 className="text-gray-300 mt-2">Contact: @chandrashekar</h4>
      </div>
    </div>
  );
};

export default About;
