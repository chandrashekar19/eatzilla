import RestaurantCard, { withPromotedLabel } from "./restaurant-card";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/use-online-status";
import UserContext from "../hooks/user-context";
import { Search, RefreshCcw, WifiOff, User } from "lucide-react";

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
  const { loggedInUser, setUserName } = useContext(UserContext);

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
      {/* Search & Filter Section */}
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gradient-to-r from-orange-300 to-yellow-200 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-lg border w-full sm:w-auto">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            data-testid="searchInput"
            className="border-none focus:ring-0 outline-none px-2 w-full sm:w-64"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchText)}
          />
        </div>

        <button
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition flex items-center"
          onClick={() => {
            setSearchText("");
            setFilteredRestaurants(listOfRestaurants);
          }}
        >
          <RefreshCcw className="mr-2" /> Reset
        </button>

        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-lg border w-full sm:w-auto">
          <User className="text-gray-500 mr-2" />
          <input
            className="border-none focus:ring-0 outline-none px-2 w-full sm:w-32"
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
            😞 No restaurants found for &quot;<strong>{searchText}</strong>
            &quot;
          </h2>
        )}
      </div>
    </div>
  );
};

export default Body;
