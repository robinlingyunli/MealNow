import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./HomePage.css";
import { PAGE_PADDING_X, PAGE_MAX_WIDTH } from "../../../constants/layout";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import PromotionHero from "../../components/PromotionHero/PromotionHero";
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const restaurantsHeadingRef = useRef(null);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    dispatch(getAllPromotions());
  }, [auth.user]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.selectedCuisine) {
      setSelectedCuisine(location.state.selectedCuisine);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedCuisine) {
      restaurantsHeadingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedCuisine]);

  const handleCuisineClick = (title) => {
    setSelectedCuisine(title);
  };

  const handleFooterCategoryClick = (title) => {
    setSelectedCuisine(title);
  };

  const filteredRestaurants = selectedCuisine
    ? restaurant.restaurants.filter(
        (r) => r.cuisineType?.toLowerCase() === selectedCuisine.toLowerCase()
      )
    : restaurant.restaurants;

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      {promotion.promotions?.length > 0 && <PromotionHero promotions={promotion.promotions} />}

      <section className="py-10 bg-[#F6F6F6]">
        <div className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X}`}>
          <p className="text-xl font-semibold text-gray-800 pb-12 text-center">Browse by Cuisine</p>
          <MultipleItemsCarousel onCuisineClick={handleCuisineClick} />
        </div>
      </section>

      <section className="pt-8 pb-20">
        <div className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X}`}>
          <div ref={restaurantsHeadingRef} className="relative flex items-center justify-center mb-14">
            <h1 className="text-xl font-semibold text-gray-900 text-center">Restaurants</h1>
            {selectedCuisine && (
              <button
                onClick={() => setSelectedCuisine(null)}
                className="absolute right-0 text-sm text-[#e91e63] font-medium hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
          {filteredRestaurants.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No restaurants found for {selectedCuisine}.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 justify-items-center">
              {filteredRestaurants.map((item, i) => (
                <RestaurantCard key={i} data={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer onCategoryClick={handleFooterCategoryClick} />

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#e91e63] text-white shadow-lg hover:bg-[#c2185b] flex items-center justify-center transition-colors"
        >
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default HomePage;
