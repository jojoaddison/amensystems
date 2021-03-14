package io.jojoaddison.repository;

import io.jojoaddison.domain.News;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends MongoRepository<News, String> {

}
