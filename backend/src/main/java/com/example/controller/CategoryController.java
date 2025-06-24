package com.example.controller;

import java.util.List;

import com.example.Exception.UserException;
import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Exception.RestaurantException;
import com.example.model.Category;
import com.example.service.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	@Autowired
	public CategoryService categoryService;

	@Autowired
	public UserService userService;
	
	@PostMapping("/admin/category")
	public ResponseEntity<Category> createdCategory(
			@RequestHeader("Authorization")String jwt,
			@RequestBody Category category) throws RestaurantException, UserException {
		User user=userService.findUserProfileByJwt(jwt);
		
		Category createdCategory=categoryService.createCategory(category.getName(), user.getId());
		return new ResponseEntity<Category>(createdCategory,HttpStatus.OK);
	}
	
	@GetMapping("/category/restaurant/{id}")
	public ResponseEntity<List<Category>> getRestaurantsCategory(
			@PathVariable Long id,
			@RequestHeader("Authorization")String jwt) throws RestaurantException, UserException {
		User user=userService.findUserProfileByJwt(jwt);
		List<Category> categories=categoryService.findCategoryByRestaurantId(id);
		return new ResponseEntity<>(categories,HttpStatus.OK);
	}

}
