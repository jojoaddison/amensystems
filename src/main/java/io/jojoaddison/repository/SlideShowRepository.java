package io.jojoaddison.repository;

import io.jojoaddison.domain.SlideShow;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the SlideShow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlideShowRepository extends MongoRepository<SlideShow, String> {

}
