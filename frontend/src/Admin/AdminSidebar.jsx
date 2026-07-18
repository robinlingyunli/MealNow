import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const MenuItems = ({ handleNavigate }) => (
  <div className="flex flex-col h-full text-base py-4">
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

export default function AdminSidebar({ handleClose, open }) {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/admin/restaurant${item.path}`);
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
}
