package io.jojoaddison.repository;

import io.jojoaddison.domain.News;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends MongoRepository<News, String> {
}
