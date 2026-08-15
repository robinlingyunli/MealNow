import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import { topMeels } from "../../../Data/topMeels";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const NextArrow = ({ onClick, className }) => {
  if (className?.includes("slick-disabled")) return null;
  return (
    <div
      onClick={onClick}
      className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
    >
      <ArrowForwardIosIcon sx={{ fontSize: 14, color: "#333" }} />
    </div>
  );
};

const PrevArrow = ({ onClick, className }) => {
  if (className?.includes("slick-disabled")) return null;
  return (
    <div
      onClick={onClick}
      className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
    >
      <ArrowBackIosNewIcon sx={{ fontSize: 14, color: "#333" }} />
    </div>
  );
};

const responsive = [
  { breakpoint: 1024, settings: { slidesToShow: 5 } },
  { breakpoint: 900, settings: { slidesToShow: 4 } },
  { breakpoint: 600, settings: { slidesToShow: 3 } },
  { breakpoint: 480, settings: { slidesToShow: 2 } },
];

const MultipleItemsCarousel = ({ onCuisineClick }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive,
  };
  return (
    <div className="relative px-12">
      <Slider {...settings}>
        {topMeels.map((item) => (
          <CarouselItem image={item.image} title={item.title} onClick={onCuisineClick} />
        ))}
      </Slider>
    </div>
  );
};

export default MultipleItemsCarousel;