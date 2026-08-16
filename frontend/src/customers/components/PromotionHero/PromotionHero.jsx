import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { PAGE_PADDING_X, PAGE_MAX_WIDTH } from "../../../constants/layout";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format";

const PromotionHero = ({ promotions }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const current = promotions[index];
  if (!current) return null;

  const goPrev = () => setIndex((i) => (i - 1 + promotions.length) % promotions.length);
  const goNext = () => setIndex((i) => (i + 1) % promotions.length);

  const handleSeeDetails = (item) => {
    const restaurant = item.restaurant;
    if (restaurant) {
      navigate(`/restaurant/${restaurant.address?.city}/${restaurant.name}/${restaurant.id}`);
    }
  };

  return (
    <section className="relative w-full min-h-[500px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-white">
      {promotions.map((item, i) => {
        const restaurant = item.restaurant;
        const image = restaurant?.images?.[0] || FALLBACK_IMAGE;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-linear ${
              i === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <div className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X} flex w-full items-center gap-10 py-14`}>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-3">
                  <LocalOfferIcon sx={{ fontSize: "1rem", color: "#e91e63" }} />
                  <span className="text-sm font-medium text-gray-600">{restaurant?.name}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {item.name}
                </h1>
                {(item.startDate || item.endDate) && (
                  <p className="mt-3 text-sm text-gray-500">
                    {item.startDate} — {item.endDate}
                  </p>
                )}
                {item.items?.length > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    {item.items.length} item{item.items.length > 1 ? "s" : ""} on sale
                  </p>
                )}
                <Button
                  variant="contained"
                  onClick={() => handleSeeDetails(item)}
                  sx={{
                    mt: 4,
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "999px",
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#c2185b" },
                  }}
                >
                  See Details
                </Button>
              </div>

              <div className="hidden flex-1 items-center justify-center md:flex">
                <div className="aspect-[9/5] w-full max-w-[42rem] overflow-hidden shadow-inner">
                  <img src={image} alt={item.name} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {promotions.length > 1 && (
        <>
          <div
            onClick={goPrev}
            role="button"
            aria-label="Previous promotion"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </div>
          <div
            onClick={goNext}
            role="button"
            aria-label="Next promotion"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100"
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </div>
        </>
      )}
    </section>
  );
};

export default PromotionHero;
