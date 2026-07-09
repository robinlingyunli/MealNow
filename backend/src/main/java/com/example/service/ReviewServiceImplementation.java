package com.example.service;

import com.example.model.Restaurant;
import com.example.model.Review;
import com.example.model.User;
import com.example.repository.RestaurantRepository;
import com.example.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Review createReview(User user, Long restaurantId, int rating, String comment) throws Exception {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new Exception("Restaurant not found with id: " + restaurantId));

        Review review = new Review();
        review.setUser(user);
        review.setRestaurant(restaurant);
        review.setRating(rating);
        review.setComment(comment);

        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(User user, Long reviewId, int rating, String comment) throws Exception {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Review not found"));
        if (!review.getUser().getId().equals(user.getId()))
            throw new Exception("Unauthorized");
        review.setRating(rating);
        review.setComment(comment);
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(User user, Long reviewId) throws Exception {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Review not found"));
        if (!review.getUser().getId().equals(user.getId()))
            throw new Exception("Unauthorized");
        reviewRepository.delete(review);
    }

    @Override
    public List<Review> getReviewsByRestaurantId(Long restaurantId) {
        return reviewRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
    }

    @Override
    public Double getAverageRating(Long restaurantId) {
        Double avg = reviewRepository.findAverageRatingByRestaurantId(restaurantId);
        return avg != null ? avg : 0.0;
    }
}
