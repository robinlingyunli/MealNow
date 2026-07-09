package com.example.controller;

import com.example.Exception.RestaurantException;
import com.example.model.Event;
import com.example.model.Restaurant;
import com.example.repository.EventRepository;
import com.example.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/api/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<Event> createEvent(
            @PathVariable Long restaurantId,
            @RequestBody Event event
    ) throws RestaurantException {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        event.setRestaurant(restaurant);
        Event saved = eventRepository.save(event);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/api/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<List<Event>> getRestaurantEvents(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(eventRepository.findByRestaurantId(restaurantId));
    }

    @GetMapping("/api/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @DeleteMapping("/api/admin/events/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long eventId) {
        eventRepository.deleteById(eventId);
        return ResponseEntity.ok("Event deleted");
    }
}
