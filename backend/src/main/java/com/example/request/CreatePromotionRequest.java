package com.example.request;

import lombok.Data;

import java.util.List;

@Data
public class CreatePromotionRequest {
    private String name;
    private String startDate;
    private String endDate;
    private List<PromotionItemRequest> items;

    @Data
    public static class PromotionItemRequest {
        private Long foodId;
        private int discountPercent;
    }
}
