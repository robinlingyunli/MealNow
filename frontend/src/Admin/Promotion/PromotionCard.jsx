import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deletePromotion } from "../../State/Admin/Promotion/promotion.action";

const PromotionCard = ({ item, onEdit }) => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const restaurantImage =
    restaurant.usersRestaurant?.images?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400";

  const handleDelete = () => {
    dispatch(deletePromotion({ jwt, promotionId: item.id }));
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <img
        src={restaurantImage}
        alt={item.name}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <h2 className="text-white font-bold text-lg">{item.name}</h2>
        <p className="text-gray-300 text-sm">
          {item.startDate} — {item.endDate}
        </p>
        {item.items && item.items.length > 0 && (
          <p className="text-gray-400 text-xs mt-1">
            {item.items.length} item(s) on sale
          </p>
        )}
      </div>
      <div className="absolute top-2 right-2 flex gap-1">
        <IconButton
          size="small"
          onClick={() => onEdit(item)}
          sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.75)" } }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{ bgcolor: "rgba(0,0,0,0.5)", color: "#f87171", "&:hover": { bgcolor: "rgba(0,0,0,0.75)" } }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default PromotionCard;
