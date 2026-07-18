import { Card } from "@mui/material";
import React from "react";

const OrderCard = ({ order }) => {
  const unitPrice = order.food?.price?.toFixed(2);
  const lineTotal = order.totalPrice?.toFixed(2);

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-4">
        <img
          className="h-14 w-14 rounded-lg object-cover"
          src={order.food?.images?.[0]}
          alt={order.food?.name}
        />
        <div>
          <p className="font-medium text-gray-900">{order.food?.name}</p>
          <p className="text-sm text-gray-400">
            ${unitPrice} × {order.quantity}
          </p>
        </div>
      </div>
      <p className="font-semibold text-gray-900">${lineTotal}</p>
    </div>
  );
};

export default OrderCard;
