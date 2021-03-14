package io.jojoaddison.repository;

import io.jojoaddison.domain.Home;
<<<<<<< HEAD
import io.jojoaddison.domain.enumeration.StateType;
import org.springframework.stereotype.Repository;
=======
>>>>>>> jhipster_upgrade

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Home entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HomeRepository extends MongoRepository<Home, String> {
<<<<<<< HEAD

    Home findByState(StateType home);
=======
>>>>>>> jhipster_upgrade
}
