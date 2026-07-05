import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Rating, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { createReview, deleteReview, getReviewsByRestaurantId, updateReview } from "../../../State/Customers/Review/review.action";
import AddReviewModal from "./AddReviewModal";

const RatingsSection = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const { review, auth } = useSelector((store) => store);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurantId) {
      dispatch(getReviewsByRestaurantId({ restaurantId, jwt }));
    }
  }, [restaurantId]);

  const handleEditOpen = (r) => {
    setEditTarget(r);
    setEditRating(r.rating);
    setEditComment(r.comment);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    await dispatch(updateReview({ restaurantId, reviewId: editTarget.id, rating: editRating, comment: editComment, jwt }));
    setEditModalOpen(false);
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview({ restaurantId, reviewId, jwt }));
  };

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between pb-4">
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Rating and Reviews
        </Typography>
        {auth.user && (
          <Button variant="outlined" size="small" onClick={() => setAddModalOpen(true)}>
            Add Review
          </Button>
        )}
      </div>

      <div className="flex items-center gap-6 pb-6">
        <div className="text-center">
          <p className="text-5xl font-bold">{review.average?.toFixed(1) || "0.0"}</p>
          <Rating value={review.average || 0} precision={0.1} readOnly size="small" />
          <p className="text-gray-400 text-sm">{review.count} Reviews</p>
        </div>
      </div>

      <div className="space-y-4">
        {review.reviews.map((r) => (
          <div key={r.id} className="border border-gray-700 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{r.user?.fullName || "User"}</p>
              <div className="flex items-center gap-1">
                <p className="text-gray-400 text-xs mr-2">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
                {auth.user?.id === r.user?.id && (
                  <>
                    <IconButton size="small" onClick={() => handleEditOpen(r)}>
                      <EditIcon sx={{ fontSize: 16, color: "gray" }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(r.id)}>
                      <DeleteIcon sx={{ fontSize: 16, color: "gray" }} />
                    </IconButton>
                  </>
                )}
              </div>
            </div>
            <Rating value={r.rating} readOnly size="small" />
            <p className="text-gray-300 text-sm">{r.comment}</p>
          </div>
        ))}
        {review.reviews.length === 0 && (
          <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
        )}
      </div>

      <AddReviewModal open={addModalOpen} onClose={() => setAddModalOpen(false)} restaurantId={restaurantId} />

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent className="space-y-4 pt-2">
          <div className="flex items-center gap-3 py-2">
            <span className="text-gray-400">Rating:</span>
            <Rating value={editRating} onChange={(e, val) => setEditRating(val)} size="large" />
          </div>
          <TextField fullWidth multiline rows={4} label="Your Review" value={editComment} onChange={(e) => setEditComment(e.target.value)} variant="outlined" />
        </DialogContent>
        <DialogActions sx={{ padding: "1rem" }}>
          <Button onClick={() => setEditModalOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={!editRating || !editComment.trim()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RatingsSection;
