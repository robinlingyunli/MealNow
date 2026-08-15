import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { PAGE_PADDING_X, PAGE_MAX_WIDTH } from "../../../constants/layout";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import PromotionBanner from "../../components/Promotion/PromotionBanner";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import { getAllPromotions } from "../../../State/Admin/Promotion/promotion.action";

const HomePage = () => {
  const { auth, restaurant, promotion } = useSelector((store) => store);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState(
    location.state?.selectedCuisine || null
  );

  useEffect(() => {
    dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    dispatch(getAllPromotions());
  }, [auth.user]);

  useEffect(() => {
    if (location.state?.selectedCuisine) {
      setSelectedCuisine(location.state.selectedCuisine);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleCuisineClick = (title) => {
    setSelectedCuisine(title);
  };

  const handleFooterCategoryClick = (title) => {
    setSelectedCuisine(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredRestaurants = selectedCuisine
    ? restaurant.restaurants.filter(
        (r) => r.cuisineType?.toLowerCase() === selectedCuisine.toLowerCase()
      )
    : restaurant.restaurants;

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <section className="py-10 bg-white">
        <div className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X}`}>
          <p className="text-xl font-semibold text-gray-800 pb-12 text-center">Browse by Cuisine</p>
          <MultipleItemsCarousel onCuisineClick={handleCuisineClick} />
        </div>
      </section>

      {promotion.promotions?.length > 0 && (
        <section className="py-8 bg-[#F6F6F6]">
          <div className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-14 text-center">Deals & Promotions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 justify-items-center">
              {promotion.promotions.map((item) => (
                <PromotionBanner key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pt-8 pb-20">
        <div className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X}`}>
          <div className="relative flex items-center justify-center mb-14">
            <h1 className="text-xl font-semibold text-gray-900 text-center">
              {selectedCuisine ? `${selectedCuisine} Restaurants` : "Restaurants"}
            </h1>
            {selectedCuisine && (
              <button
                onClick={() => setSelectedCuisine(null)}
                className="absolute right-0 text-sm text-[#e91e63] font-medium hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 justify-items-center">
            {filteredRestaurants.map((item, i) => (
              <RestaurantCard key={i} data={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer onCategoryClick={handleFooterCategoryClick} />
    </div>
  );
};

export default HomePage;
