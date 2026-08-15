import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backdrop, CircularProgress, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import RatingsSection from "../../components/Review/RatingsSection";
import Footer from "../../components/Footer/Footer";
import { PAGE_PADDING_X, PAGE_MAX_WIDTH } from "../../../constants/layout";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";

const Restaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSide, setActiveSide] = useState("menu");
  const [searchKeyword, setSearchKeyword] = useState("");
  const reviewsRef = useRef(null);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: "",
      })
    );
  }, [id]);

  const groupedItems = menu.menuItems.reduce((acc, item) => {
    const cat = item.foodCategory?.name || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedItems);

  const filterBySearch = (items) => {
    if (!searchKeyword.trim()) return items;
    const kw = searchKeyword.toLowerCase();
    return items.filter(
      (item) =>
        item.name?.toLowerCase().includes(kw) ||
        item.description?.toLowerCase().includes(kw) ||
        item.foodCategory?.name?.toLowerCase().includes(kw)
    );
  };

  const displayedItems = filterBySearch(
    activeCategory === "all" ? menu.menuItems : groupedItems[activeCategory] || []
  );

  const filteredGrouped = searchKeyword.trim()
    ? Object.fromEntries(
        Object.entries(groupedItems)
          .map(([cat, items]) => [cat, filterBySearch(items)])
          .filter(([, items]) => items.length > 0)
      )
    : groupedItems;

  const handleFooterCategoryClick = (title) => {
    navigate("/", { state: { selectedCuisine: title } });
  };

  const sidebarItem = (label, isActive, onClick) => (
    <p
      onClick={onClick}
      className={`cursor-pointer py-2 text-sm font-medium transition-colors pl-3 border-l-4 ${
        isActive
          ? "border-gray-900 text-gray-900"
          : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
      }`}
    >
      {label}
    </p>
  );

  return (
    <>
      <div className={`${PAGE_PADDING_X} pt-8 bg-white min-h-screen ${PAGE_MAX_WIDTH}`}>
        <section>
          {restaurant.restaurant?.images?.[0] && (
            <div className="w-full h-56 lg:h-72 overflow-hidden">
              <img
                src={restaurant.restaurant.images[0]}
                alt={restaurant.restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="pt-3 pb-5 lg:flex lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold py-6 text-gray-900">
                {restaurant.restaurant?.name}
              </h1>
              <p className="text-gray-500 my-2 text-sm">{restaurant.restaurant?.description}</p>
              <div className="space-y-2 mt-2">
                <p className="text-gray-500 flex items-center gap-2 text-sm">
                  <LocationOnIcon fontSize="small" />
                  <span>{restaurant.restaurant?.address.streetAddress}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <TodayIcon fontSize="small" />
                  <span className="text-emerald-600 font-medium">
                    {restaurant.restaurant?.openingHours} (Today)
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-6 lg:mt-8 lg:w-[35%]">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder={`Search in ${restaurant.restaurant?.name || "restaurant"}...`}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9E9E9E", fontSize: "1.1rem" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    backgroundColor: "#F6F6F6",
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": { borderColor: "#E0E0E0" },
                  },
                }}
              />
            </div>
          </div>
        </section>

        <Divider />

        <section className="pt-8 lg:flex relative">
          {/* Left sidebar */}
          <div className="lg:w-[20%]">
            <div className="lg:sticky top-28 space-y-1">
              <Typography
                variant="subtitle2"
                sx={{ color: "#9E9E9E", fontWeight: 700, letterSpacing: "0.08em", pb: 1, fontSize: "0.7rem", textTransform: "uppercase" }}
              >
                Menu
              </Typography>

              {sidebarItem(
                "All",
                activeSide === "menu" && activeCategory === "all",
                () => { setActiveCategory("all"); setActiveSide("menu"); }
              )}

              {categories.map((name) =>
                sidebarItem(
                  name,
                  activeSide === "menu" && activeCategory === name,
                  () => { setActiveCategory(name); setActiveSide("menu"); }
                )
              )}

              <Divider sx={{ mt: 2 }} />

              <div className="pt-6 pb-6">
                <Typography
                  variant="subtitle2"
                  onClick={() => setActiveSide("reviews")}
                  sx={{
                    fontWeight: 700,
                    cursor: "pointer",
                    color: activeSide === "reviews" ? "#1A1A1A" : "#6B6B6B",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    "&:hover": { color: "#1A1A1A" },
                  }}
                >
                  Reviews
                </Typography>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-[80%] lg:pl-10 space-y-10 pb-16">
            {activeSide === "menu" &&
              (activeCategory === "all"
                ? Object.entries(filteredGrouped).map(([categoryName, items]) => (
                    <div key={categoryName}>
                      <Typography variant="h6" sx={{ fontWeight: 700, pb: 2, color: "#1A1A1A" }}>
                        {categoryName}
                      </Typography>
                      <div className="grid grid-cols-2 gap-x-10 gap-y-0">
                        {items.map((item) => (
                          <MenuItemCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  ))
                : (
                  <div>
                    <Typography variant="h6" sx={{ fontWeight: 700, pb: 2, color: "#1A1A1A" }}>
                      {activeCategory}
                    </Typography>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-0">
                      {displayedItems.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
            {activeSide === "reviews" && (
              <div ref={reviewsRef}>
                <RatingsSection restaurantId={id} />
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer onCategoryClick={handleFooterCategoryClick} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading || restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Restaurant;
