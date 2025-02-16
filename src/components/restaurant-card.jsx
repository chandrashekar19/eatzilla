/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { StarIcon } from "lucide-react";
import { CDN_URL } from "../constants/end-points";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo } = resData;
  const { deliveryTime } = resData.sla;

  // Extract the numeric value from the string
  const costValue = parseInt(costForTwo.match(/\d+/)[0], 10);

  return (
    <div
      data-testid="resCard"
      className="m-4 p-4 w-[270px] bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="relative">
        <img
          className="rounded-lg w-full h-40 object-cover"
          alt="Restaurant Logo"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600 truncate">
          {cuisines.length > 2
            ? cuisines.slice(0, 2).join(", ") + "..."
            : cuisines.join(", ")}
        </p>

        <div className="flex items-center mt-2 space-x-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-gray-700">{avgRating}</span>
        </div>
        <div className="flex justify-between items-center mt-2 text-gray-700">
          <span className="text-sm font-semibold bg-green-100 px-2 py-1 rounded-lg">
            ₹{costValue / 2} FOR TWO
          </span>
          <span className="text-sm font-medium bg-blue-100 px-2 py-1 rounded-lg">
            {deliveryTime} min
          </span>
        </div>
      </div>
    </div>
  );
};

// 🔥 **Higher Order Component (HOC) for Promoted Restaurants**
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-lg shadow-md">
        🔥 Promoted
      </span>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
