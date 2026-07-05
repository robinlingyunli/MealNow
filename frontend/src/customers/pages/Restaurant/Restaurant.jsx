import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import RatingsSection from "../../components/Review/RatingsSection";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';

const Restaurant = () => {
  const dispatch = useDispatch();
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
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: id,
      seasonal: false,
      vegetarian: false,
      nonveg: false,
      foodCategory: "",
    }));
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
        Object.entries(groupedItems).map(([cat, items]) => [cat, filterBySearch(items)]).filter(([, items]) => items.length > 0)
      )
    : groupedItems;

  return (
    <>
      <div className="px-5 lg:px-20">
        <section>
          <div className="pt-3 pb-5 lg:flex lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold py-8">{restaurant.restaurant?.name}</h1>
              <p className="text-gray-500 my-4">{restaurant.restaurant?.description}</p>
              <div className="space-y-3 mt-3">
                <p className="text-gray-500 flex items-center gap-3">
                  <LocationOnIcon /> <span>{restaurant.restaurant?.address.streetAddress}</span>
                </p>
                <p className="flex items-center gap-3 text-gray-500">
                  <TodayIcon /> <span className="text-orange-300">{restaurant.restaurant?.openingHours} (Today)</span>
                </p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:w-[35%]">
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`Search in ${restaurant.restaurant?.name || "restaurant"}...`}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </div>
          </div>
        </section>
        <Divider />

        <section className="pt-[2rem] lg:flex relative">
          <div className="lg:w-[20%]">
            <div className="lg:sticky top-28 space-y-3">
              <Typography variant="h5" sx={{ paddingBottom: "0.5rem", fontWeight: 600 }}>
                Menu
              </Typography>
              <p
                onClick={() => { setActiveCategory("all"); setActiveSide("menu"); }}
                className={`cursor-pointer py-1 text-sm ${activeSide === "menu" && activeCategory === "all" ? "text-white font-semibold" : "text-gray-400"} hover:text-white transition-colors`}
              >
                All
              </p>
              {categories.map((name) => (
                <p
                  key={name}
                  onClick={() => { setActiveCategory(name); setActiveSide("menu"); }}
                  className={`cursor-pointer py-1 text-sm ${activeSide === "menu" && activeCategory === name ? "text-white font-semibold" : "text-gray-400"} hover:text-white transition-colors`}
                >
                  {name}
                </p>
              ))}

              <Divider sx={{ my: 1 }} />

              <Typography
                variant="h5"
                onClick={() => setActiveSide("reviews")}
                sx={{ fontWeight: 600, cursor: "pointer", color: "white" }}
              >
                Reviews
              </Typography>
            </div>
          </div>

          <div className="lg:w-[80%] lg:pl-10 space-y-10">
            {activeSide === "menu" && (
              activeCategory === "all"
                ? Object.entries(filteredGrouped).map(([categoryName, items]) => (
                    <div key={categoryName}>
                      <Typography variant="h5" sx={{ fontWeight: 600, paddingBottom: "1rem" }}>
                        {categoryName}
                      </Typography>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <MenuItemCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  ))
                : (
                  <div>
                    <Typography variant="h5" sx={{ fontWeight: 600, paddingBottom: "1rem" }}>
                      {activeCategory}
                    </Typography>
                    <div className="space-y-3">
                      {displayedItems.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )
            )}
            {activeSide === "reviews" && (
              <div ref={reviewsRef}>
                <RatingsSection restaurantId={id} />
              </div>
            )}
          </div>
        </section>
      </div>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={menu.loading || restaurant.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Restaurant;
