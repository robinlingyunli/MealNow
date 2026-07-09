package com.example.controller;

import com.example.model.Review;
import com.example.model.User;
import com.example.request.CreateReviewRequest;
import com.example.service.ReviewService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(reviewService.getReviewsByRestaurantId(restaurantId));
    }

    @GetMapping("/average")
    public ResponseEntity<Map<String, Object>> getAverageRating(@PathVariable Long restaurantId) {
        Double avg = reviewService.getAverageRating(restaurantId);
        int count = reviewService.getReviewsByRestaurantId(restaurantId).size();
        return ResponseEntity.ok(Map.of("average", avg, "count", count));
    }

    @PostMapping
    public ResponseEntity<Review> createReview(
            @PathVariable Long restaurantId,
            @RequestBody CreateReviewRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(user, restaurantId, req.getRating(), req.getComment());
        return ResponseEntity.ok(review);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long restaurantId,
            @PathVariable Long reviewId,
            @RequestBody CreateReviewRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.updateReview(user, reviewId, req.getRating(), req.getComment());
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(
            @PathVariable Long restaurantId,
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        reviewService.deleteReview(user, reviewId);
        return ResponseEntity.ok("Review deleted");
    }
}
