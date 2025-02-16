/* eslint-disable react/prop-types */
import { ChevronDown, ChevronUp } from "lucide-react";
import ItemList from "./item-list";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex((prevIndex) => (prevIndex === data.title ? null : data.title));
  };

  return (
    <div className="max-w-4xl w-full mx-auto my-4 bg-white shadow-md rounded-lg overflow-hidden transition-all">
      {/* Header */}
      <div
        className="flex justify-between items-center bg-gray-100 px-6 py-4 cursor-pointer hover:bg-gray-200 transition-all"
        onClick={handleClick}
      >
        <span className="font-semibold text-lg text-gray-800">
          {data.title} ({data.itemCards.length})
        </span>
        {showItems ? (
          <ChevronUp className="text-gray-600" />
        ) : (
          <ChevronDown className="text-gray-600" />
        )}
      </div>

      {/* Items List (Accordion Content) */}
      {showItems && (
        <div className="p-6 border-t border-gray-300">
          <ItemList items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
