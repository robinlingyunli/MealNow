package com.example.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class RestaurantDto {

	private String title;
	private String name;
	private String cuisineType;
	private String openingHours;

	@Embedded
	private AddressSummary address;

	@Column(length = 1000)
	private List<String> images;

	private String description;
	private Long id;
	private Boolean open;

	@Data
	@Embeddable
	public static class AddressSummary {
		private String streetAddress;
		private String city;
	}

}
