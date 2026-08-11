package com.github.njtsb1.countries.resources;

import java.util.List;

import com.github.njtsb1.countries.entities.Country;
import com.github.njtsb1.countries.repositories.CountryRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryResource {

  private final CountryRepository repository;

  public CountryResource(final CountryRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/countries")
  public List<Country> cities() {

    return repository.findAll();
  }
}
