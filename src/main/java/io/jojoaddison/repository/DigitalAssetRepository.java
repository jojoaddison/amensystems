package io.jojoaddison.repository;

import io.jojoaddison.domain.DigitalAsset;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the DigitalAsset entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DigitalAssetRepository extends MongoRepository<DigitalAsset, String> {

}
