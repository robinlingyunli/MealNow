import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
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

const ProfileNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/my-profile/${item.path ?? item.title.toLowerCase()}`);
    }
  };

  const isActive = (item) => {
    if (item.title === "Logout") return false;
    const path = item.path ?? item.title.toLowerCase();
    return location.pathname.includes(path);
  };

  return (
    <>
      {/* Large screen: vertical sidebar */}
      <div className="hidden lg:block w-[20vw] min-h-screen border-r border-gray-200 bg-white shrink-0 sticky top-0 self-start">
        <div className="flex flex-col text-base py-4">
          {menu.map((item, i) => (
            <React.Fragment key={item.title}>
              <div
                onClick={() => handleNavigate(item)}
                className={`px-5 py-6 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                  isActive(item) ? "text-gray-900" : "text-gray-700"
                }`}
              >
                <span className={isActive(item) ? "text-gray-900" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span className={`font-medium ${isActive(item) ? "font-semibold" : ""}`}>
                  {item.title}
                </span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Small screen: horizontal tab bar */}
      <div className="lg:hidden w-full bg-white border-b border-gray-200 flex overflow-x-auto sticky top-0 z-40">
        {menu.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.title}
              onClick={() => handleNavigate(item)}
              className={`flex flex-col items-center gap-1 px-5 py-3 text-xs font-medium shrink-0 border-b-2 transition-colors ${
                active
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ProfileNavigation;
