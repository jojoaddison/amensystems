package io.jojoaddison.web.rest;

import io.jojoaddison.domain.SlideShow;
import io.jojoaddison.repository.SlideShowRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.jojoaddison.domain.SlideShow}.
 */
@RestController
@RequestMapping("/api")
public class SlideShowResource {

    private final Logger log = LoggerFactory.getLogger(SlideShowResource.class);

    private static final String ENTITY_NAME = "slideShow";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SlideShowRepository slideShowRepository;

    public SlideShowResource(SlideShowRepository slideShowRepository) {
        this.slideShowRepository = slideShowRepository;
    }

    /**
     * {@code POST  /slide-shows} : Create a new slideShow.
     *
     * @param slideShow the slideShow to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new slideShow, or with status {@code 400 (Bad Request)} if the slideShow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/slide-shows")
    public ResponseEntity<SlideShow> createSlideShow(@RequestBody SlideShow slideShow) throws URISyntaxException {
        log.debug("REST request to save SlideShow : {}", slideShow);
        if (slideShow.getId() != null) {
            throw new BadRequestAlertException("A new slideShow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SlideShow result = slideShowRepository.save(slideShow);
        return ResponseEntity.created(new URI("/api/slide-shows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /slide-shows} : Updates an existing slideShow.
     *
     * @param slideShow the slideShow to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated slideShow,
     * or with status {@code 400 (Bad Request)} if the slideShow is not valid,
     * or with status {@code 500 (Internal Server Error)} if the slideShow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/slide-shows")
    public ResponseEntity<SlideShow> updateSlideShow(@RequestBody SlideShow slideShow) throws URISyntaxException {
        log.debug("REST request to update SlideShow : {}", slideShow);
        if (slideShow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SlideShow result = slideShowRepository.save(slideShow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, slideShow.getId()))
            .body(result);
    }

    /**
     * {@code GET  /slide-shows} : get all the slideShows.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of slideShows in body.
     */
    @GetMapping("/slide-shows")
    public List<SlideShow> getAllSlideShows() {
        log.debug("REST request to get all SlideShows");
        return slideShowRepository.findAll();
    }

    /**
     * {@code GET  /slide-shows/:id} : get the "id" slideShow.
     *
     * @param id the id of the slideShow to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the slideShow, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/slide-shows/{id}")
    public ResponseEntity<SlideShow> getSlideShow(@PathVariable String id) {
        log.debug("REST request to get SlideShow : {}", id);
        Optional<SlideShow> slideShow = slideShowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(slideShow);
    }

    /**
     * {@code DELETE  /slide-shows/:id} : delete the "id" slideShow.
     *
     * @param id the id of the slideShow to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/slide-shows/{id}")
    public ResponseEntity<Void> deleteSlideShow(@PathVariable String id) {
        log.debug("REST request to delete SlideShow : {}", id);
        slideShowRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
