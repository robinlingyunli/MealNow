import React from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { pink } from "@mui/material/colors";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const navigateToCart = () => navigate("/cart");

  const navigateToProfile = () => {
    auth.user?.role === "ROLE_ADMIN" || auth.user?.role === "ROLE_RESTAURANT_OWNER"
      ? navigate("/admin/restaurant")
      : navigate("/my-profile");
  };

  const handleCloseAuthModel = () => navigate(-1);
  const navigateToHome = () => navigate("/");

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  return (
    <div className="px-5 z-50 py-[.8rem] bg-white border-b border-gray-200 shadow-sm lg:px-20 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div
          onClick={navigateToHome}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <li className="logo font-semibold text-[#e91e63] text-2xl">
            Meal Now
          </li>
        </div>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-6">
        <IconButton onClick={() => navigate("/search")}>
          <SearchIcon sx={{ fontSize: "1.5rem", color: "#1A1A1A" }} />
        </IconButton>

        <div className="flex items-center space-x-2">
          {auth.user?.fullName ? (
            <span
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={
                auth.user?.role === "ROLE_ADMIN"
                  ? handleOpenMenu
                  : navigateToProfile
              }
              className="cursor-pointer"
            >
              <Avatar sx={{ bgcolor: pink.A400, color: "white", width: 36, height: 36, fontSize: "0.95rem" }}>
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login", { state: { backgroundLocation: location } })}>
              <PersonIcon sx={{ fontSize: "2rem", color: "#1A1A1A" }} />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem
              onClick={() =>
                auth.user?.role === "ROLE_ADMIN"
                  ? navigate("/admin")
                  : navigate("/super-admin")
              }
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        <IconButton onClick={navigateToCart}>
          <Badge color="error" badgeContent={cart.cartItems.length}>
            <ShoppingCartIcon sx={{ fontSize: "2rem", color: "#1A1A1A" }} />
          </Badge>
        </IconButton>
      </div>

      <Auth handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Navbar;
