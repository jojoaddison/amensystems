package io.jojoaddison.service;

import io.jojoaddison.domain.Home;
import io.jojoaddison.repository.HomeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Home.
 */
@Service
public class HomeService {

    private final Logger log = LoggerFactory.getLogger(HomeService.class);

    private final HomeRepository homeRepository;

    public HomeService(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    /**
     * Save a home.
     *
     * @param home the entity to save
     * @return the persisted entity
     */
    public Home save(Home home) {
        log.debug("Request to save Home : {}", home);
        return homeRepository.save(home);
    }

    /**
     *  Get all the homes.
     *
     *  @return the list of entities
     */
    public List<Home> findAll() {
        log.debug("Request to get all Homes");
        return homeRepository.findAll();
    }

    /**
     *  Get one home by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public Home findOne(String id) {
        log.debug("Request to get Home : {}", id);
        return homeRepository.findOne(id);
    }

    /**
     *  Delete the  home by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Home : {}", id);
        homeRepository.delete(id);
    }
}
