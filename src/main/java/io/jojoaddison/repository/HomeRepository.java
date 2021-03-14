package io.jojoaddison.repository;

import io.jojoaddison.domain.Home;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Home entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HomeRepository extends MongoRepository<Home, String> {

}
