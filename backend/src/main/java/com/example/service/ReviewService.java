package com.example.service;

import com.example.model.Review;
import com.example.model.User;

import java.util.List;

public interface ReviewService {
    Review createReview(User user, Long restaurantId, int rating, String comment) throws Exception;
    Review updateReview(User user, Long reviewId, int rating, String comment) throws Exception;
    void deleteReview(User user, Long reviewId) throws Exception;
    List<Review> getReviewsByRestaurantId(Long restaurantId);
    Double getAverageRating(Long restaurantId);
}
