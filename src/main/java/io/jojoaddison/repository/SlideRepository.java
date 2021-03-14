package io.jojoaddison.repository;

import io.jojoaddison.domain.Slide;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Slide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlideRepository extends MongoRepository<Slide, String> {
}
