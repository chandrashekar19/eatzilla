import { useEffect } from "react";
import { RESTAURANT_API } from "../utils/constants";

const useRestaurantApi = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANT_API);
    const json = await data.json();
    setResInfo(json.data);
  };

  return resInfo;
};

export default useRestaurantApi;
