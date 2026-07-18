package com.example.service;

import com.example.Exception.CartException;
import com.example.Exception.CartItemException;
import com.example.Exception.FoodException;
import com.example.Exception.UserException;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Food;
import com.example.model.User;
import com.example.request.AddCartItemRequest;
import com.example.request.UpdateCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Double calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
