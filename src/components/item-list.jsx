/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addItem } from "../hooks/cart-slice";
import { CDN_URL } from "../constants/end-points";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col min-h-[220px] justify-between transition-transform hover:scale-[1.02]"
        >
          {/* Item Name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {item.card.info.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 flex-grow">
            {item.card.info.description.length > 100
              ? `${item.card.info.description.substring(0, 100)}...`
              : item.card.info.description}
          </p>

          {/* Price */}
          <p className="text-lg font-bold text-green-600 mt-2">
            ₹
            {item.card.info.price
              ? item.card.info.price / 100
              : item.card.info.defaultPrice / 100}
          </p>

          {/* Image + Button */}
          <div className="flex items-center justify-between mt-4">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-16 h-16 object-cover rounded-lg shadow-md"
            />
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-md hover:bg-blue-700 transition duration-300"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
