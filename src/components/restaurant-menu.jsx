/* eslint-disable no-unsafe-optional-chaining */
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/use-restaurant-menu";
import RestaurantCategory from "./restaurant-category";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage, avgRating } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const category =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = category.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      {/* Restaurant Details */}
      <div className="text-center  rounded-lg p-6 mb-6">
        <h1 className="font-bold text-3xl text-gray-800">{name}</h1>
        <p className="text-lg text-gray-600 mt-2">
          {cuisines.join(", ")} - {costForTwoMessage}
        </p>
        <span className="text-green-600 font-semibold text-xl">
          {avgRating} ⭐
        </span>
      </div>

      {/* Category Accordion List */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={showIndex === index}
            setShowIndex={() =>
              setShowIndex((prevIndex) => (prevIndex === index ? null : index))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
