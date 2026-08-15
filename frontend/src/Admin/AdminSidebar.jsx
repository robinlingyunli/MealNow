import * as React from "react";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { logout } from "../State/Authentication/Action";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Promotions", icon: <LocalOfferIcon />, path: "/promotion" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/admin/restaurant${item.path}`);
    }
  };

  const isActive = (item) => {
    if (item.title === "Logout") return false;
    if (item.path === "/") return location.pathname === "/admin/restaurant";
    return location.pathname.includes(`/admin/restaurant${item.path}`);
  };

  return (
    <>
      {/* Large screen: vertical sidebar */}
      <div className="hidden lg:block w-[20vw] min-h-screen border-r border-gray-200 bg-white shrink-0">
        <div className="flex flex-col h-full text-base py-4">
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
              className={`flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium shrink-0 border-b-2 transition-colors ${
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
}
