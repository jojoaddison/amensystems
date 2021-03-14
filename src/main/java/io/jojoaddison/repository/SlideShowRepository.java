package io.jojoaddison.repository;

import io.jojoaddison.domain.SlideShow;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SlideShow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlideShowRepository extends MongoRepository<SlideShow, String> {
}
