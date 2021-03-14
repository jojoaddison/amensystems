package io.jojoaddison.repository;

import io.jojoaddison.domain.DigitalAsset;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DigitalAsset entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DigitalAssetRepository extends MongoRepository<DigitalAsset, String> {
}
