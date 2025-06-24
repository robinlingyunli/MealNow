package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<String> homeController() {
        return new ResponseEntity<>("Welcome to food delivery project", HttpStatus.OK);
    }
}
