package io.jojoaddison.repository;

import io.jojoaddison.domain.Home;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Home entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HomeRepository extends MongoRepository<Home, String> {
}
