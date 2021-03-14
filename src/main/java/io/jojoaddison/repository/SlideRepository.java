package io.jojoaddison.repository;

import io.jojoaddison.domain.Slide;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Slide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlideRepository extends MongoRepository<Slide, String> {

}
