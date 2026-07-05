import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createReview, getReviewsByRestaurantId } from "../../../State/Customers/Review/review.action";

const AddReviewModal = ({ open, onClose, restaurantId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const jwt = localStorage.getItem("jwt");

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) return;
    await dispatch(createReview({ restaurantId, rating, comment, jwt }));
    await dispatch(getReviewsByRestaurantId({ restaurantId, jwt }));
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Your Review</DialogTitle>
      <DialogContent className="space-y-4 pt-2">
        <div className="flex items-center gap-3 py-2">
          <span className="text-gray-400">Your Rating:</span>
          <Rating
            value={rating}
            onChange={(e, val) => setRating(val)}
            size="large"
          />
        </div>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!rating || !comment.trim()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewModal;
