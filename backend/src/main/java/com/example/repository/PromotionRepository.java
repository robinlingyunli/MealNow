package com.example.repository;

import com.example.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByRestaurantId(Long restaurantId);
    Optional<Promotion> findFirstByRestaurantId(Long restaurantId);
}
