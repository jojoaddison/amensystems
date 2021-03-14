package io.jojoaddison.service;

import io.jojoaddison.domain.Slide;
import io.jojoaddison.repository.SlideRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Slide.
 */
@Service
public class SlideService {

    private final Logger log = LoggerFactory.getLogger(SlideService.class);

    private final SlideRepository slideRepository;

    public SlideService(SlideRepository slideRepository) {
        this.slideRepository = slideRepository;
    }

    /**
     * Save a slide.
     *
     * @param slide the entity to save
     * @return the persisted entity
     */
    public Slide save(Slide slide) {
        log.debug("Request to save Slide : {}", slide);
        return slideRepository.save(slide);
    }

    /**
     *  Get all the slides.
     *
     *  @return the list of entities
     */
    public List<Slide> findAll() {
        log.debug("Request to get all Slides");
        return slideRepository.findAll();
    }

    /**
     *  Get one slide by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public Slide findOne(String id) {
        log.debug("Request to get Slide : {}", id);
        return slideRepository.findOne(id);
    }

    /**
     *  Delete the  slide by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Slide : {}", id);
        slideRepository.delete(id);
    }
}
