package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Exception.FoodException;
import com.example.Exception.RestaurantException;
import com.example.Exception.UserException;
import com.example.model.Food;
import com.example.model.User;
import com.example.request.CreateFoodRequest;
import com.example.service.FoodService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/food")
public class MenuItemController {
	@Autowired
	private FoodService menuItemService;
	
	@Autowired
	private UserService userService;


	@GetMapping("/search")
	public ResponseEntity<List<Food>> searchFood(
			@RequestParam String name)  {
		List<Food> menuItem = menuItemService.searchFood(name);
		return ResponseEntity.ok(menuItem);
	}
	@GetMapping("/cuisine")
	public ResponseEntity<List<Food>> getFoodByCuisineType(
			@RequestParam String type)  {
		List<Food> menuItem = menuItemService.getFoodByCuisineType(type);
		return ResponseEntity.ok(menuItem);
	}
	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<Food>> getMenuItemByRestaurantId(
			@PathVariable Long restaurantId,
			@RequestParam boolean vegetarian,
			@RequestParam boolean seasonal,
			@RequestParam boolean nonveg,
			@RequestParam(required = false) String food_category) throws FoodException {
		List<Food> menuItems= menuItemService.getRestaurantsFood(
				restaurantId,vegetarian,nonveg,seasonal,food_category);
		return ResponseEntity.ok(menuItems);
	}
	


}
