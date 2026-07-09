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
import FastfoodIcon from "@mui/icons-material/Fastfood";

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
  <div className="flex flex-col h-full text-xl py-4">
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

  // 大屏幕：普通 div，正常文档流，不遮挡 navbar
  if (!isSmallScreen) {
    return (
      <div className="w-[20vw] min-h-screen border-r border-gray-800 shrink-0">
        <MenuItems handleNavigate={handleNavigate} />
      </div>
    );
  }

  // 手机：MUI Drawer 临时弹出
  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <div className="w-[70vw] h-full">
        <MenuItems handleNavigate={handleNavigate} />
      </div>
    </Drawer>
  );
}
