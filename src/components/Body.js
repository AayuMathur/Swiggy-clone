import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
const swiggyRestaurantsList =  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.95250&lng=75.71050&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";


  const fetchData = async () => {
    const data = await fetch(
      swiggyRestaurantsList
    );
    const json = await data.json();
    console.log(json);
    setListOfRestaurants(
      json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (listOfRestaurants.length === 0) {
    return<Shimmer/>;
  }

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="restaurant-container">
        {listOfRestaurants.map(function (items) {
          return <RestaurantCard resData={items} />;
        })}
      </div>
    </div>
  );
};

export default Body;
