import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPromotionsByRestaurant } from "../../State/Admin/Promotion/promotion.action";
import PromotionCard from "./PromotionCard";

const PromotionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurant, promotion } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(
        getPromotionsByRestaurant({
          jwt,
          restaurantId: restaurant.usersRestaurant.id,
        })
      );
    }
  }, [restaurant.usersRestaurant?.id]);

  const handleEdit = (item) => {
    navigate("/admin/restaurant/promotion/edit", { state: { promotion: item } });
  };

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Promotions</h1>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/restaurant/promotion/create")}
          disabled={promotion.promotions?.length > 0}
          title={promotion.promotions?.length > 0 ? "Only one promotion allowed per restaurant" : ""}
        >
          Create Promotion
        </Button>
      </div>

      {promotion.promotions?.length === 0 ? (
        <div className="text-gray-400 text-center mt-20">
          <p className="text-lg">No promotions yet.</p>
          <p className="text-sm mt-2">Create one to start offering discounts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {promotion.promotions?.map((item) => (
            <PromotionCard key={item.id} item={item} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromotionList;
