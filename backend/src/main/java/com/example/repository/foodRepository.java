package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Category;
import com.example.model.Food;

public interface foodRepository extends JpaRepository<Food, Long> {

	
	List<Food> findByRestaurantId(Long restaurantId);

	long countByFoodCategoryId(Long categoryId);
	
	@Query("SELECT f FROM Food f WHERE "
			+ "(f.name LIKE %:keyword% OR "
			+ "f.restaurant.name LIKE %:keyword%) AND "
			+ "f.restaurant IS NOT NULL"
	)
	List<Food> searchByNameOrCategory(@Param("keyword") String keyword);

	@Query("SELECT f FROM Food f WHERE "
			+ "LOWER(f.restaurant.cuisineType) = LOWER(:cuisineType) AND "
			+ "f.restaurant IS NOT NULL"
	)
	List<Food> findByCuisineType(@Param("cuisineType") String cuisineType);


	

}
