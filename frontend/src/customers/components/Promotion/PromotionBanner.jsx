import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format";

const PromotionBanner = ({ item }) => {
  const navigate = useNavigate();
  const restaurant = item.restaurant;
  const image = restaurant?.images?.[0] || FALLBACK_IMAGE;

  const handleSeeDetails = () => {
    if (restaurant) {
      navigate(
        `/restaurant/${restaurant.address?.city}/${restaurant.name}/${restaurant.id}`
      );
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group w-full max-w-[27rem]">
      <img
        src={image}
        alt={item.name}
        className="w-full h-[15rem] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <LocalOfferIcon sx={{ fontSize: "0.95rem", color: "#fff" }} />
              <span className="text-white text-sm font-medium truncate">
                {restaurant?.name}
              </span>
            </div>
            <h3 className="text-white font-bold text-base leading-tight line-clamp-2">
              {item.name}
            </h3>
            {(item.startDate || item.endDate) && (
              <p className="text-gray-300 text-xs mt-1">
                {item.startDate} — {item.endDate}
              </p>
            )}
            {item.items?.length > 0 && (
              <p className="text-gray-400 text-xs mt-0.5">
                {item.items.length} item{item.items.length > 1 ? "s" : ""} on sale
              </p>
            )}
          </div>
        </div>
        <Button
          size="small"
          variant="contained"
          onClick={handleSeeDetails}
          sx={{
            mt: 1.5,
            alignSelf: "flex-start",
            backgroundColor: "#e91e63",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            borderRadius: "20px",
            px: 2,
            py: 0.5,
            textTransform: "none",
            "&:hover": { backgroundColor: "#c2185b" },
          }}
        >
          See Details
        </Button>
      </div>
    </div>
  );
};

export default PromotionBanner;
