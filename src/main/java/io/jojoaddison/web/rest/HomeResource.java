package io.jojoaddison.web.rest;

import io.jojoaddison.domain.Home;
import io.jojoaddison.service.HomeService;
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
 * REST controller for managing {@link io.jojoaddison.domain.Home}.
 */
@RestController
@RequestMapping("/api")
public class HomeResource {

    private final Logger log = LoggerFactory.getLogger(HomeResource.class);

    private static final String ENTITY_NAME = "home";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HomeService homeService;

    public HomeResource(HomeService homeService) {
        this.homeService = homeService;
    }

    /**
     * {@code POST  /homes} : Create a new home.
     *
     * @param home the home to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new home, or with status {@code 400 (Bad Request)} if the home has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/homes")
    public ResponseEntity<Home> createHome(@RequestBody Home home) throws URISyntaxException {
        log.debug("REST request to save Home : {}", home);
        if (home.getId() != null) {
            throw new BadRequestAlertException("A new home cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Home result = homeService.save(home);
        return ResponseEntity.created(new URI("/api/homes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /homes} : Updates an existing home.
     *
     * @param home the home to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated home,
     * or with status {@code 400 (Bad Request)} if the home is not valid,
     * or with status {@code 500 (Internal Server Error)} if the home couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/homes")
    public ResponseEntity<Home> updateHome(@RequestBody Home home) throws URISyntaxException {
        log.debug("REST request to update Home : {}", home);
        if (home.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Home result = homeService.save(home);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, home.getId()))
            .body(result);
    }

    /**
     * {@code GET  /homes} : get all the homes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of homes in body.
     */
    @GetMapping("/homes")
    public List<Home> getAllHomes() {
        log.debug("REST request to get all Homes");
        return homeService.findAll();
    }

    /**
     * {@code GET  /homes/:id} : get the "id" home.
     *
     * @param id the id of the home to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the home, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/homes/{id}")
    public ResponseEntity<Home> getHome(@PathVariable String id) {
        log.debug("REST request to get Home : {}", id);
        Optional<Home> home = homeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(home);
    }

    /**
     * {@code DELETE  /homes/:id} : delete the "id" home.
     *
     * @param id the id of the home to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/homes/{id}")
    public ResponseEntity<Void> deleteHome(@PathVariable String id) {
        log.debug("REST request to delete Home : {}", id);
        homeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
