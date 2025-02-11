/* eslint-disable react/no-unescaped-entities */
import RestaurantCard, { withPromtedLabel } from "./restaurant-card";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/use-online-status";
import UserContext from "../hooks/user-context";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D12.9064481%26lng%3D77.6037295%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  const handleSearch = (text) => {
    const filteredList = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRestaurants(filteredList);
  };

  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(UserContext);

  if (!onlineStatus)
    return (
      <h1 className="text-center text-xl font-semibold text-red-600 mt-10">
        ❌ You're offline! Please check your internet connection.
      </h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-24">
      {/* Search & Filter Section */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-6 bg-gradient-to-r from-orange-300 to-yellow-200 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-lg border">
          <input
            type="text"
            data-testid="searchInput"
            className="border-none focus:ring-0 outline-none px-2 w-64"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e.target.value); // Instant filtering
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchText)}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            onClick={() => handleSearch(searchText)}
          >
            🔍 Search
          </button>
        </div>

        <button
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={() => {
            setSearchText(""); // Clear search box
            setFilteredRestaurants(listOfRestaurants); // Restore full list
          }}
        >
          🔄 Reset
        </button>

        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-lg border">
          <label className="text-gray-600 font-medium">User Name:</label>
          <input
            className="border-none focus:ring-0 outline-none px-2 w-32"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant?.info.id}
              to={`/restaurants/${restaurant?.info.id}`}
              className="transform transition hover:scale-105 hover:shadow-lg"
            >
              {restaurant?.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant?.info} />
              ) : (
                <RestaurantCard resData={restaurant?.info} />
              )}
            </Link>
          ))
        ) : (
          <h2 className="text-center text-gray-600 text-lg col-span-full">
            😞 No restaurants found for "<strong>{searchText}</strong>"
          </h2>
        )}
      </div>
    </div>
  );
};

export default Body;
