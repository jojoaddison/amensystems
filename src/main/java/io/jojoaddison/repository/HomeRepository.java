package io.jojoaddison.repository;

import io.jojoaddison.domain.Home;
import io.jojoaddison.domain.enumeration.StateType;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Home entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HomeRepository extends MongoRepository<Home, String> {

    Home findByState(StateType home);
}
