/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { CDN_URL } from "../constants/end-points";
const RestaurantCard = (props) => {
  const { resData } = props;
  // const { loggedInUser } = useContext(UserContext);

  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo } = resData;

  const { deliveryTime } = resData.sla;

  // Extract the numeric value from the string
  const costValue = parseInt(costForTwo.match(/\d+/)[0], 10);

  return (
    <div
      data-testid="resCard"
      className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200"
    >
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>₹{costValue / 2} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

// Higher Order Component

// input - RestaurantCard =>> RestaurantCardPromoted

export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
