import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress, Divider, Typography } from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
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

  const displayedItems = activeCategory === "all"
    ? menu.menuItems
    : groupedItems[activeCategory] || [];

  return (
    <>
      <div className="px-5 lg:px-20">
        <section>
          <div className="pt-3 pb-5">
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
        </section>
        <Divider />

        <section className="pt-[2rem] lg:flex relative">
          <div className="lg:w-[20%]">
            <div className="lg:sticky top-28 space-y-3">
              <Typography variant="h5" sx={{ paddingBottom: "0.5rem", fontWeight: 600 }}>
                Menu
              </Typography>
              <p
                onClick={() => setActiveCategory("all")}
                className={`cursor-pointer py-1 text-sm ${activeCategory === "all" ? "text-white font-semibold" : "text-gray-400"} hover:text-white transition-colors`}
              >
                All
              </p>
              {categories.map((name) => (
                <p
                  key={name}
                  onClick={() => setActiveCategory(name)}
                  className={`cursor-pointer py-1 text-sm ${activeCategory === name ? "text-white font-semibold" : "text-gray-400"} hover:text-white transition-colors`}
                >
                  {name}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:w-[80%] lg:pl-10 space-y-10">
            {activeCategory === "all"
              ? categories.map((categoryName) => (
                  <div key={categoryName}>
                    <Typography variant="h5" sx={{ fontWeight: 600, paddingBottom: "1rem" }}>
                      {categoryName}
                    </Typography>
                    <div className="space-y-3">
                      {groupedItems[categoryName].map((item) => (
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
            }
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
