package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Exception.RestaurantException;
import com.example.model.Category;
import com.example.model.Restaurant;
import com.example.repository.CategoryRepository;
import com.example.repository.foodRepository;

@Service
public class CategoryServiceImplementation implements CategoryService {
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private foodRepository foodRepo;

	@Override
	public Category createCategory(String name,Long userId) throws RestaurantException {
		Restaurant restaurant=restaurantService.getRestaurantsByUserId(userId);
		Category createdCategory=new Category();
		
		createdCategory.setName(name);
		createdCategory.setRestaurant(restaurant);
		return categoryRepository.save(createdCategory);
	}

	@Override
	public List<Category> findCategoryByRestaurantId(Long id) throws RestaurantException {
		Restaurant restaurant=restaurantService.findRestaurantById(id);
		return categoryRepository.findByRestaurantId(id);
	}

	@Override
	public Category findCategoryById(Long id) throws RestaurantException {
		Optional<Category> opt=categoryRepository.findById(id);
		if(opt.isEmpty()) {
			throw new RestaurantException("category not exist with id "+id);
		}
		return opt.get();
	}

	@Override
	public void deleteCategory(Long id) throws RestaurantException {
		Category category = findCategoryById(id);
		long count = foodRepo.countByFoodCategoryId(id);
		if (count > 0) {
			throw new RestaurantException(
				"Cannot delete \"" + category.getName() + "\": " + count + " menu item(s) belong to this category. Please remove them first."
			);
		}
		categoryRepository.delete(category);
	}

}
