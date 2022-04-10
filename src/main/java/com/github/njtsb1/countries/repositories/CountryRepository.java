package com.github.njtsb1.countries.repositories;

import com.github.njtsb1.countries.entities.Country;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
