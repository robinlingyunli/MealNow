import React, { useEffect, useState } from "react";
import "./HomePage.css";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import PromotionBanner from "../../components/Promotion/PromotionBanner";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import { getAllPromotions } from "../../../State/Admin/Promotion/promotion.action";

const HomePage = () => {
  const { auth, restaurant, promotion } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    dispatch(getAllPromotions());
  }, [auth.user]);

  const handleCuisineClick = (title) => {
    setSelectedCuisine(title);
  };

  const filteredRestaurants = selectedCuisine
    ? restaurant.restaurants.filter(
        (r) => r.cuisineType?.toLowerCase() === selectedCuisine.toLowerCase()
      )
    : restaurant.restaurants;

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <section className="p-10 lg:py-10 lg:px-20 bg-white">
        <p className="text-xl font-semibold text-gray-800 pb-6">Browse by Cuisine</p>
        <MultipleItemsCarousel onCuisineClick={handleCuisineClick} />
      </section>

      {promotion.promotions?.length > 0 && (
        <section className="px-5 lg:px-20 py-8 bg-[#F6F6F6]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Deals & Promotions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promotion.promotions.map((item) => (
              <PromotionBanner key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section className="px-5 lg:px-20 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {selectedCuisine ? `${selectedCuisine} Restaurants` : "Restaurants"}
          </h1>
          {selectedCuisine && (
            <button
              onClick={() => setSelectedCuisine(null)}
              className="text-sm text-[#e91e63] font-medium hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          {filteredRestaurants.map((item, i) => (
            <RestaurantCard key={i} data={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
