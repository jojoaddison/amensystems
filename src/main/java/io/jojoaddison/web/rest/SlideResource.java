package io.jojoaddison.web.rest;

import io.jojoaddison.domain.Slide;
import io.jojoaddison.service.SlideService;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.jojoaddison.domain.Slide}.
 */
@RestController
@RequestMapping("/api")
public class SlideResource {

    private final Logger log = LoggerFactory.getLogger(SlideResource.class);

    private static final String ENTITY_NAME = "slide";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SlideService slideService;

    public SlideResource(SlideService slideService) {
        this.slideService = slideService;
    }

    /**
     * {@code POST  /slides} : Create a new slide.
     *
     * @param slide the slide to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new slide, or with status {@code 400 (Bad Request)} if the slide has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/slides")
    public ResponseEntity<Slide> createSlide(@RequestBody Slide slide) throws URISyntaxException {
        log.debug("REST request to save Slide : {}", slide);
        if (slide.getId() != null) {
            throw new BadRequestAlertException("A new slide cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Slide result = slideService.save(slide);
        return ResponseEntity.created(new URI("/api/slides/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /slides} : Updates an existing slide.
     *
     * @param slide the slide to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated slide,
     * or with status {@code 400 (Bad Request)} if the slide is not valid,
     * or with status {@code 500 (Internal Server Error)} if the slide couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/slides")
    public ResponseEntity<Slide> updateSlide(@RequestBody Slide slide) throws URISyntaxException {
        log.debug("REST request to update Slide : {}", slide);
        if (slide.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Slide result = slideService.save(slide);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, slide.getId()))
            .body(result);
    }

    /**
     * {@code GET  /slides} : get all the slides.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of slides in body.
     */
    @GetMapping("/slides")
    public List<Slide> getAllSlides() {
        log.debug("REST request to get all Slides");
        return slideService.findAll();
    }

    /**
     * {@code GET  /slides/:id} : get the "id" slide.
     *
     * @param id the id of the slide to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the slide, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/slides/{id}")
    public ResponseEntity<Slide> getSlide(@PathVariable String id) {
        log.debug("REST request to get Slide : {}", id);
        Optional<Slide> slide = slideService.findOne(id);
        return ResponseUtil.wrapOrNotFound(slide);
    }

    /**
     * {@code DELETE  /slides/:id} : delete the "id" slide.
     *
     * @param id the id of the slide to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/slides/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable String id) {
        log.debug("REST request to delete Slide : {}", id);
        slideService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
