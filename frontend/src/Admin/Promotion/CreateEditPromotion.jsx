import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import { createPromotion, updatePromotion } from "../../State/Admin/Promotion/promotion.action";

const CreateEditPromotion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { restaurant, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const editPromotion = location.state?.promotion || null;

  const [name, setName] = useState(editPromotion?.name || "");
  const [startDate, setStartDate] = useState(editPromotion?.startDate || "");
  const [endDate, setEndDate] = useState(editPromotion?.endDate || "");
  const [selectedItems, setSelectedItems] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant.id,
          jwt,
          seasonal: false,
          vegetarian: false,
          nonveg: false,
          foodCategory: "",
        })
      );
    }
  }, [restaurant.usersRestaurant?.id]);

  useEffect(() => {
    if (editPromotion?.items && menu.menuItems?.length > 0) {
      const map = {};
      editPromotion.items.forEach((pi) => {
        map[pi.food.id] = pi.discountPercent;
      });
      setSelectedItems(map);
    }
  }, [menu.menuItems]);

  const toggleItem = (foodId) => {
    setSelectedItems((prev) => {
      if (prev[foodId] !== undefined) {
        const next = { ...prev };
        delete next[foodId];
        return next;
      }
      return { ...prev, [foodId]: 10 };
    });
  };

  const setDiscount = (foodId, value) => {
    setSelectedItems((prev) => ({ ...prev, [foodId]: value }));
  };

  const handleSubmit = async () => {
    if (!name || !startDate || !endDate) {
      setError("Please fill in all fields.");
      return;
    }
    if (Object.keys(selectedItems).length === 0) {
      setError("Please select at least one food item.");
      return;
    }
    setError("");
    setSubmitting(true);

    const items = Object.entries(selectedItems).map(([foodId, discountPercent]) => ({
      foodId: Number(foodId),
      discountPercent,
    }));

    const payload = { name, startDate, endDate, items };

    let result;
    if (editPromotion) {
      result = await dispatch(updatePromotion({ jwt, promotionId: editPromotion.id, data: payload }));
    } else {
      result = await dispatch(
        createPromotion({ jwt, restaurantId: restaurant.usersRestaurant?.id, data: payload })
      );
    }

    setSubmitting(false);
    if (result?.success) {
      navigate("/admin/restaurant/promotion");
    } else {
      setError(result?.error || "Failed to save promotion. It may already exist.");
    }
  };

  return (
    <div className="px-6 py-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {editPromotion ? "Edit Promotion" : "Create Promotion"}
      </h1>

      <div className="space-y-4 mb-6">
        <TextField
          label="Promotion Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
        <div className="flex gap-4">
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Select Items & Set Discount</h2>

      {menu.loading ? (
        <CircularProgress />
      ) : (
        <div className="space-y-3">
          {menu.menuItems?.map((food) => {
            const selected = selectedItems[food.id] !== undefined;
            const discount = selectedItems[food.id] ?? 0;

            return (
              <div
                key={food.id}
                className={`flex items-center gap-4 p-3 rounded-lg border ${
                  selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <Checkbox
                  checked={selected}
                  onChange={() => toggleItem(food.id)}
                  size="small"
                />
                <img
                  src={food.images?.[0]}
                  alt={food.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{food.name}</p>
                  <p className="text-sm text-gray-500">${food.price}</p>
                </div>
                {selected && (
                  <div className="w-40 flex-shrink-0">
                    <Typography variant="caption" className="text-gray-600">
                      Discount: {discount}%
                    </Typography>
                    <Slider
                      value={discount}
                      min={10}
                      max={80}
                      step={10}
                      marks
                      onChange={(_, val) => setDiscount(food.id, val)}
                      size="small"
                      sx={{ color: "#3b82f6" }}
                    />
                    <p className="text-xs text-green-400">
                      Sale: ${((food.price * (100 - discount)) / 100).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

      <div className="flex gap-3 mt-6">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={20} /> : editPromotion ? "Save Changes" : "Create Promotion"}
        </Button>
        <Button variant="outlined" onClick={() => navigate("/admin/restaurant/promotion")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateEditPromotion;
