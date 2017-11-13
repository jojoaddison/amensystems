package io.jojoaddison.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import io.jojoaddison.domain.Slide;
import io.jojoaddison.service.SlideService;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Slide.
 */
@RestController
@RequestMapping("/api")
public class SlideResource {

    private final Logger log = LoggerFactory.getLogger(SlideResource.class);

    private static final String ENTITY_NAME = "slide";

    private final SlideService slideService;

    public SlideResource(SlideService slideService) {
        this.slideService = slideService;
    }

    /**
     * POST  /slides : Create a new slide.
     *
     * @param slide the slide to create
     * @return the ResponseEntity with status 201 (Created) and with body the new slide, or with status 400 (Bad Request) if the slide has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/slides")
    @Timed
    public ResponseEntity<Slide> createSlide(@RequestBody Slide slide) throws URISyntaxException {
        log.debug("REST request to save Slide : {}", slide);
        if (slide.getId() != null) {
            throw new BadRequestAlertException("A new slide cannot already have an ID", ENTITY_NAME, "idexists");
        }
        slide.setCreatedDate(ZonedDateTime.now());
        slide.setLastModified(ZonedDateTime.now());
        Slide result = slideService.save(slide);
        return ResponseEntity.created(new URI("/api/slides/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /slides : Updates an existing slide.
     *
     * @param slide the slide to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated slide,
     * or with status 400 (Bad Request) if the slide is not valid,
     * or with status 500 (Internal Server Error) if the slide couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/slides")
    @Timed
    public ResponseEntity<Slide> updateSlide(@RequestBody Slide slide) throws URISyntaxException {
        log.debug("REST request to update Slide : {}", slide);
        if (slide.getId() == null) {
            return createSlide(slide);
        }
        slide.setLastModified(ZonedDateTime.now());
        Slide result = slideService.update(slide);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, slide.getId().toString()))
            .body(result);
    }

    /**
     * GET  /slides : get all the slides.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of slides in body
     */
    @GetMapping("/slides")
    @Timed
    public List<Slide> getAllSlides() {
        log.debug("REST request to get all Slides");
        return slideService.findAll();
        }

    /**
     * GET  /slides/:id : get the "id" slide.
     *
     * @param id the id of the slide to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the slide, or with status 404 (Not Found)
     */
    @GetMapping("/slides/{id}")
    @Timed
    public ResponseEntity<Slide> getSlide(@PathVariable String id) {
        log.debug("REST request to get Slide : {}", id);
        Slide slide = slideService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(slide));
    }

    /**
     * DELETE  /slides/:id : delete the "id" slide.
     *
     * @param id the id of the slide to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/slides/{id}")
    @Timed
    public ResponseEntity<Void> deleteSlide(@PathVariable String id) {
        log.debug("REST request to delete Slide : {}", id);
        slideService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
