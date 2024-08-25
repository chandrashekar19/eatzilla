import { useEffect, useState } from "react";
import Shimmer from "./shimmer";

const RestaurantMenu = () => {
  const [resInfo, setRsInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);

  // BCZ useEffect has empty dependency array, it will run only once after initial render

  const fetchMenu = async () => {
    const data = await fetch(
      "https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Fmenu%2Fpl%3Fpage-type%3DREGULAR_MENU%26complete-menu%3Dtrue%26lat%3D12.9351929%26lng%3D77.62448069999999%26restaurantId%3D425%26subitAction%3DENTER"
    );
    const json = await data.json();
    console.log("DATA", json);
    setRsInfo(json.data);
  };
  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>Name of the Restaurant</h1>
      <h2>Menu</h2>
      <ul>
        <li>Biryani</li>
        <li>Noodles</li>
        <li>Pizza</li>
        <li>Burgers</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
