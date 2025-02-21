import RestaurantCard, { withPromotedLabel } from "./restaurant-card";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/use-online-status";
import { Search, RefreshCcw, WifiOff } from "lucide-react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

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

  if (!onlineStatus)
    return (
      <h1 className="text-center text-xl font-semibold text-red-600 mt-10 flex items-center justify-center">
        <WifiOff className="mr-2" /> You are offline! Please check your internet
        connection.
      </h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-4 sm:p-6 md:p-10 lg:p-16">
      {/* Search & Reset Section (Now Mobile-Friendly) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-2 sm:gap-4 mb-6 w-full">
        {/* Search Input (Smaller for Mobile) */}
        <div className="flex items-center bg-white px-3 py-2  rounded-full shadow-md border w-10/12 sm:w-72">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            data-testid="searchInput"
            className="border-none focus:ring-0 outline-none px-1 w-full text-gray-800 text-sm sm:text-base"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchText)}
          />
        </div>

        {/* Reset Button (Smaller on Mobile) */}
        <button
          className="px-3 py-2 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition flex items-center text-sm sm:text-base w-auto"
          onClick={() => {
            setSearchText("");
            setFilteredRestaurants(listOfRestaurants);
          }}
        >
          <RefreshCcw className="mr-2" size={16} /> Reset
        </button>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant?.info.id}
              to={`/restaurants/${restaurant?.info.id}`}
              className="flex justify-center"
            >
              {restaurant?.info.promoted ? (
                <RestaurantCardPromoted
                  resData={restaurant?.info}
                  className="w-full max-w-[320px] h-auto"
                />
              ) : (
                <RestaurantCard
                  resData={restaurant?.info}
                  className="w-full max-w-[320px] h-auto"
                />
              )}
            </Link>
          ))
        ) : (
          <h2 className="text-center text-gray-600 text-lg col-span-full">
            😞 No restaurants found for &quot;<strong>{searchText}</strong>
            &quot;
          </h2>
        )}
      </div>
    </div>
  );
};

export default Body;
