import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDispatch } from "react-redux";
import { logout } from "../../../State/Authentication/Action";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Promotions", icon: <LocalOfferIcon />, path: "events" },
  { title: "Logout", icon: <LogoutIcon /> },
];

const MenuItems = ({ handleNavigate }) => (
  <div className="flex flex-col text-base py-4">
    {menu.map((item, i) => (
      <React.Fragment key={item.title}>
        <div
          onClick={() => handleNavigate(item)}
          className="px-5 py-6 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span className="text-gray-500">{item.icon}</span>
          <span className="font-medium">{item.title}</span>
        </div>
        {i !== menu.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </div>
);

const ProfileNavigation = ({ handleClose = () => {}, open }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/my-profile/${item.path ?? item.title.toLowerCase()}`);
    }
    handleClose();
  };

  if (!isSmallScreen) {
    return (
      <div className="w-[20vw] min-h-screen border-r border-gray-200 bg-white shrink-0">
        <MenuItems handleNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <div className="w-[70vw] h-full bg-white">
        <MenuItems handleNavigate={handleNavigate} />
      </div>
    </Drawer>
  );
};

export default ProfileNavigation;
