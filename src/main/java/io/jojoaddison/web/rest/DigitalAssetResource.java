package io.jojoaddison.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jojoaddison.domain.DigitalAsset;
import io.jojoaddison.service.DigitalAssetService;
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
 * REST controller for managing DigitalAsset.
 */
@RestController
@RequestMapping("/api")
public class DigitalAssetResource {

    private final Logger log = LoggerFactory.getLogger(DigitalAssetResource.class);

    private static final String ENTITY_NAME = "digitalAsset";

    private final DigitalAssetService digitalAssetService;

    public DigitalAssetResource(DigitalAssetService digitalAssetService) {
        this.digitalAssetService = digitalAssetService;
    }

    /**
     * POST  /digital-assets : Create a new digitalAsset.
     *
     * @param digitalAsset the digitalAsset to create
     * @return the ResponseEntity with status 201 (Created) and with body the new digitalAsset, or with status 400 (Bad Request) if the digitalAsset has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/digital-assets")
    @Timed
    public ResponseEntity<DigitalAsset> createDigitalAsset(@RequestBody DigitalAsset digitalAsset) throws URISyntaxException {
        log.debug("REST request to save DigitalAsset : {}", digitalAsset);
        if (digitalAsset.getId() != null) {
            throw new BadRequestAlertException("A new digitalAsset cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DigitalAsset result = digitalAssetService.save(digitalAsset);
        return ResponseEntity.created(new URI("/api/digital-assets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /digital-assets : Updates an existing digitalAsset.
     *
     * @param digitalAsset the digitalAsset to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated digitalAsset,
     * or with status 400 (Bad Request) if the digitalAsset is not valid,
     * or with status 500 (Internal Server Error) if the digitalAsset couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/digital-assets")
    @Timed
    public ResponseEntity<DigitalAsset> updateDigitalAsset(@RequestBody DigitalAsset digitalAsset) throws URISyntaxException {
        log.debug("REST request to update DigitalAsset : {}", digitalAsset);
        if (digitalAsset.getId() == null) {
            return createDigitalAsset(digitalAsset);
        }
        DigitalAsset result = digitalAssetService.save(digitalAsset);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, digitalAsset.getId().toString()))
            .body(result);
    }

    /**
     * GET  /digital-assets : get all the digitalAssets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of digitalAssets in body
     */
    @GetMapping("/digital-assets")
    @Timed
    public List<DigitalAsset> getAllDigitalAssets() {
        log.debug("REST request to get all DigitalAssets");
        return digitalAssetService.findAll();
        }

    /**
     * GET  /digital-assets/:id : get the "id" digitalAsset.
     *
     * @param id the id of the digitalAsset to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the digitalAsset, or with status 404 (Not Found)
     */
    @GetMapping("/digital-assets/{id}")
    @Timed
    public ResponseEntity<DigitalAsset> getDigitalAsset(@PathVariable String id) {
        log.debug("REST request to get DigitalAsset : {}", id);
        DigitalAsset digitalAsset = digitalAssetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(digitalAsset));
    }

    /**
     * DELETE  /digital-assets/:id : delete the "id" digitalAsset.
     *
     * @param id the id of the digitalAsset to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/digital-assets/{id}")
    @Timed
    public ResponseEntity<Void> deleteDigitalAsset(@PathVariable String id) {
        log.debug("REST request to delete DigitalAsset : {}", id);
        digitalAssetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
