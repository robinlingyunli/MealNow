package com.example.controller;

import com.example.Exception.RestaurantException;
import com.example.model.Food;
import com.example.model.Promotion;
import com.example.model.PromotionItem;
import com.example.model.Restaurant;
import com.example.repository.PromotionRepository;
import com.example.repository.foodRepository;
import com.example.request.CreatePromotionRequest;
import com.example.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/promotions")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private foodRepository foodRepo;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/restaurant/{restaurantId}")
    public ResponseEntity<?> createPromotion(
            @PathVariable Long restaurantId,
            @RequestBody CreatePromotionRequest req
    ) throws RestaurantException {
        if (promotionRepository.findFirstByRestaurantId(restaurantId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This restaurant already has an active promotion.");
        }

        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        Promotion promotion = new Promotion();
        promotion.setName(req.getName());
        promotion.setStartDate(req.getStartDate());
        promotion.setEndDate(req.getEndDate());
        promotion.setRestaurant(restaurant);

        List<PromotionItem> items = buildItems(promotion, req.getItems());
        promotion.setItems(items);

        applyDiscounts(req.getItems());
        Promotion saved = promotionRepository.save(promotion);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{promotionId}")
    public ResponseEntity<Promotion> updatePromotion(
            @PathVariable Long promotionId,
            @RequestBody CreatePromotionRequest req
    ) {
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));

        resetDiscounts(promotion.getItems());

        promotion.setName(req.getName());
        promotion.setStartDate(req.getStartDate());
        promotion.setEndDate(req.getEndDate());

        promotion.getItems().clear();
        List<PromotionItem> newItems = buildItems(promotion, req.getItems());
        promotion.getItems().addAll(newItems);

        applyDiscounts(req.getItems());
        return ResponseEntity.ok(promotionRepository.save(promotion));
    }

    @DeleteMapping("/{promotionId}")
    public ResponseEntity<String> deletePromotion(@PathVariable Long promotionId) {
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        resetDiscounts(promotion.getItems());
        promotionRepository.delete(promotion);
        return ResponseEntity.ok("Promotion deleted");
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Promotion>> getByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(promotionRepository.findByRestaurantId(restaurantId));
    }

    private List<PromotionItem> buildItems(Promotion promotion, List<CreatePromotionRequest.PromotionItemRequest> reqs) {
        List<PromotionItem> items = new ArrayList<>();
        if (reqs == null) return items;
        for (CreatePromotionRequest.PromotionItemRequest r : reqs) {
            Food food = foodRepo.findById(r.getFoodId()).orElse(null);
            if (food == null) continue;
            PromotionItem pi = new PromotionItem();
            pi.setPromotion(promotion);
            pi.setFood(food);
            pi.setDiscountPercent(r.getDiscountPercent());
            items.add(pi);
        }
        return items;
    }

    private void applyDiscounts(List<CreatePromotionRequest.PromotionItemRequest> reqs) {
        if (reqs == null) return;
        for (CreatePromotionRequest.PromotionItemRequest r : reqs) {
            foodRepo.findById(r.getFoodId()).ifPresent(food -> {
                food.setDiscountPercent(r.getDiscountPercent());
                foodRepo.save(food);
            });
        }
    }

    private void resetDiscounts(List<PromotionItem> items) {
        for (PromotionItem pi : items) {
            Food food = pi.getFood();
            food.setDiscountPercent(0);
            foodRepo.save(food);
        }
    }
}
