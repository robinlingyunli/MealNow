package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
