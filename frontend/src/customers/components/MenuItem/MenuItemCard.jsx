import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = () => {
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

  return (
    <div className="lg:flex items-center justify-between py-3 border-b border-gray-700">
      <div className="lg:flex items-center lg:space-x-5">
        <img
          className="w-[7rem] h-[7rem] object-cover"
          src={item.images[0]}
          alt=""
        />
        <div className="space-y-1 lg:space-y-3 lg:max-w-2xl">
          <p className="font-semibold text-xl">{item.name}</p>
          <p>₹{item.price}</p>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>
      <div className="pt-3 lg:pt-0">
        <Button variant="contained" disabled={!item.available} onClick={handleAddItemToCart}>
          {item.available ? "Add To Cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;
