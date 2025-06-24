package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByFoodIsContaining

}
