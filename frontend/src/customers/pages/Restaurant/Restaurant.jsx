import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';

const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();
  const [activeCategories, setActiveCategories] = useState([]);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
    dispatch(getRestaurantById({ jwt: localStorage.getItem("jwt"), restaurantId: id }));
    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));
  }, [id]);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt: localStorage.getItem("jwt"),
        restaurantId: id,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: foodCategory || "",
      })
    );
  }, [id, foodCategory]);

  useEffect(() => {
    if (!foodCategory && menu.menuItems.length > 0) {
      const cats = [...new Set(
        menu.menuItems.map((item) => item.foodCategory?.name).filter(Boolean)
      )];
      setActiveCategories(cats);
    }
  }, [menu.menuItems]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("food_category");
    }
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <><div className="px-5 lg:px-20 ">
      <section>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold py-8">
            {restaurant.restaurant?.name}
          </h1>
          <p className="text-gray-500 my-4">{restaurant.restaurant?.description}</p>
          <div className="space-y-3 mt-3">
              <p className="text-gray-500 flex items-center gap-3">
            <LocationOnIcon/> <span>{restaurant.restaurant?.address.streetAddress}
              </span> 
          </p>
          <p className="flex items-center gap-3 text-gray-500">
           <TodayIcon/> <span className=" text-orange-300"> {restaurant.restaurant?.openingHours} (Today)</span>  
          </p>
          </div>
        
        </div>
      </section>
      <Divider />

      <section className="pt-[2rem] lg:flex relative ">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div className="">
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Category
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="food_category"
                  value={foodCategory || "all"}
                  onChange={handleFilter}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                    sx={{ color: "gray" }}
                  />
                  {activeCategories.map((name, index) => (
                    <FormControlLabel
                      key={index}
                      value={name}
                      control={<Radio />}
                      label={name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {menu?.menuItems.map((item) => (
            <MenuItemCard item={item} />
            // <p>ashok</p>
          ))}
        </div>
      </section>
    </div>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={menu.loading || restaurant.loading}
  
>
  <CircularProgress color="inherit" />
</Backdrop>
    </>
    
  );
};

export default Restaurant;
