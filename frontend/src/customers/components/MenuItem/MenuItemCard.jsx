import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import AddIcon from "@mui/icons-material/Add";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  const handleAddItemToCart = () => {
    if (!auth.user) {
      navigate("/account/login", { state: { backgroundLocation: location } });
      return;
    }
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: [],
      },
    };
    dispatch(addItemToCart(data));
  };

  const discountedPrice = item.discountPercent > 0
    ? ((item.price * (100 - item.discountPercent)) / 100).toFixed(2)
    : null;

  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 gap-4">
      {/* Text section */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-gray-900 text-base">{item.name}</p>

        {discountedPrice ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">${discountedPrice}</span>
            <span className="text-gray-400 line-through text-sm">${item.price?.toFixed(2)}</span>
            <span className="text-xs bg-[#e91e63] text-white px-1.5 py-0.5 rounded font-medium">
              -{item.discountPercent}%
            </span>
          </div>
        ) : (
          <p className="font-semibold text-gray-900">${item.price?.toFixed(2)}</p>
        )}

        <p className="text-gray-500 text-sm leading-snug line-clamp-2">{item.description}</p>
      </div>

      {/* Image + button section */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="relative">
          <img
            className="w-[5.5rem] h-[5.5rem] object-cover rounded-xl"
            src={item.images[0]}
            alt={item.name}
          />
        </div>
        {item.available ? (
          <button
            onClick={handleAddItemToCart}
            className="flex items-center gap-1 text-xs font-semibold text-[#e91e63] border border-[#e91e63] rounded-full px-3 py-1 hover:bg-[#fce4ec] transition-colors"
          >
            <AddIcon sx={{ fontSize: "0.85rem" }} />
            Add
          </button>
        ) : (
          <span className="text-xs text-gray-400 font-medium">Out of stock</span>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
