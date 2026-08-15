import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../../State/Authentication/Action";
import { isPresentInFavorites } from "../../../config/logic";

const RestaurantCard = ({ data, index }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    if (!auth.user) {
      navigate("/account/login", { state: { backgroundLocation: location } });
      return;
    }
    dispatch(addToFavorites({ restaurantId: data.id, jwt: auth.jwt || jwt }));
  };

  const navigateToRestaurant = () => {
    if (data.open)
      navigate(`/restaurant/${data.address.city}/${data.name}/${data.id}`);
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full max-w-[27rem] cursor-pointer group"
      onClick={navigateToRestaurant}
    >
      <div className={`relative overflow-hidden ${!data.open ? "opacity-70" : ""}`}>
        <img
          className="w-full h-[15rem] object-cover group-hover:scale-105 transition-transform duration-300"
          src={data.images[0]}
          alt={data.name}
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={data.open ? "success" : "error"}
          label={data.open ? "Open" : "Closed"}
        />
        {!data.open && (
          <div className="absolute inset-0 bg-white/30" />
        )}
      </div>

      <div className="p-4 flex justify-between items-start">
        <div className="space-y-1 flex-1 min-w-0 pr-2">
          <p className="font-semibold text-gray-900 text-base truncate">{data.name}</p>
          <p className="text-gray-500 text-sm leading-snug line-clamp-2">
            {data.description}
          </p>
          <p className="text-gray-500 flex items-center gap-2 text-sm">
            <LocationOnIcon fontSize="small" />
            <span className="truncate">{data.address?.streetAddress}</span>
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <TodayIcon fontSize="small" />
            <span className="text-emerald-600 font-medium">
              {data.openingHours} (Today)
            </span>
          </p>
        </div>
        <IconButton
          size="small"
          onClick={handleAddToFavorites}
          sx={{ flexShrink: 0, mt: "-4px" }}
        >
          {isPresentInFavorites(auth.favorites, data) ? (
            <FavoriteIcon color="primary" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" sx={{ color: "#6B6B6B" }} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default RestaurantCard;
