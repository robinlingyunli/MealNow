import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch } from "react-redux";
import { logout } from "../../../State/Authentication/Action";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const MenuItems = ({ handleNavigate }) => (
  <div className="flex flex-col text-xl py-4">
    {menu.map((item, i) => (
      <React.Fragment key={item.title}>
        <div
          onClick={() => handleNavigate(item)}
          className="px-5 py-8 flex items-center space-x-5 cursor-pointer hover:bg-gray-800"
        >
          {item.icon}
          <span>{item.title}</span>
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
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    handleClose();
  };

  if (!isSmallScreen) {
    return (
      <div className="w-[20vw] min-h-screen border-r border-gray-800 shrink-0">
        <MenuItems handleNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <div className="w-[70vw] h-full">
        <MenuItems handleNavigate={handleNavigate} />
      </div>
    </Drawer>
  );
};

export default ProfileNavigation;
