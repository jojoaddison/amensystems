package io.jojoaddison.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jojoaddison.domain.SlideShow;

import io.jojoaddison.repository.SlideShowRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SlideShow.
 */
@RestController
@RequestMapping("/api")
public class SlideShowResource {

    private final Logger log = LoggerFactory.getLogger(SlideShowResource.class);

    private static final String ENTITY_NAME = "slideShow";

    private final SlideShowRepository slideShowRepository;

    public SlideShowResource(SlideShowRepository slideShowRepository) {
        this.slideShowRepository = slideShowRepository;
    }

    /**
     * POST  /slide-shows : Create a new slideShow.
     *
     * @param slideShow the slideShow to create
     * @return the ResponseEntity with status 201 (Created) and with body the new slideShow, or with status 400 (Bad Request) if the slideShow has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/slide-shows")
    @Timed
    public ResponseEntity<SlideShow> createSlideShow(@RequestBody SlideShow slideShow) throws URISyntaxException {
        log.debug("REST request to save SlideShow : {}", slideShow);
        if (slideShow.getId() != null) {
            throw new BadRequestAlertException("A new slideShow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SlideShow result = slideShowRepository.save(slideShow);
        return ResponseEntity.created(new URI("/api/slide-shows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /slide-shows : Updates an existing slideShow.
     *
     * @param slideShow the slideShow to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated slideShow,
     * or with status 400 (Bad Request) if the slideShow is not valid,
     * or with status 500 (Internal Server Error) if the slideShow couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/slide-shows")
    @Timed
    public ResponseEntity<SlideShow> updateSlideShow(@RequestBody SlideShow slideShow) throws URISyntaxException {
        log.debug("REST request to update SlideShow : {}", slideShow);
        if (slideShow.getId() == null) {
            return createSlideShow(slideShow);
        }
        SlideShow result = slideShowRepository.save(slideShow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, slideShow.getId().toString()))
            .body(result);
    }

    /**
     * GET  /slide-shows : get all the slideShows.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of slideShows in body
     */
    @GetMapping("/slide-shows")
    @Timed
    public List<SlideShow> getAllSlideShows() {
        log.debug("REST request to get all SlideShows");
        return slideShowRepository.findAll();
        }

    /**
     * GET  /slide-shows/:id : get the "id" slideShow.
     *
     * @param id the id of the slideShow to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the slideShow, or with status 404 (Not Found)
     */
    @GetMapping("/slide-shows/{id}")
    @Timed
    public ResponseEntity<SlideShow> getSlideShow(@PathVariable String id) {
        log.debug("REST request to get SlideShow : {}", id);
        SlideShow slideShow = slideShowRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(slideShow));
    }

    /**
     * DELETE  /slide-shows/:id : delete the "id" slideShow.
     *
     * @param id the id of the slideShow to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/slide-shows/{id}")
    @Timed
    public ResponseEntity<Void> deleteSlideShow(@PathVariable String id) {
        log.debug("REST request to delete SlideShow : {}", id);
        slideShowRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
