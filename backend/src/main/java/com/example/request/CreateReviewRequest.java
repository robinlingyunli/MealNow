package com.example.request;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private int rating;
    private String comment;
}
