package io.jojoaddison.web.rest;

import io.jojoaddison.domain.DigitalAsset;
import io.jojoaddison.service.DigitalAssetService;
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
 * REST controller for managing {@link io.jojoaddison.domain.DigitalAsset}.
 */
@RestController
@RequestMapping("/api")
public class DigitalAssetResource {

    private final Logger log = LoggerFactory.getLogger(DigitalAssetResource.class);

    private static final String ENTITY_NAME = "digitalAsset";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DigitalAssetService digitalAssetService;

    public DigitalAssetResource(DigitalAssetService digitalAssetService) {
        this.digitalAssetService = digitalAssetService;
    }

    /**
     * {@code POST  /digital-assets} : Create a new digitalAsset.
     *
     * @param digitalAsset the digitalAsset to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new digitalAsset, or with status {@code 400 (Bad Request)} if the digitalAsset has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/digital-assets")
    public ResponseEntity<DigitalAsset> createDigitalAsset(@RequestBody DigitalAsset digitalAsset) throws URISyntaxException {
        log.debug("REST request to save DigitalAsset : {}", digitalAsset);
        if (digitalAsset.getId() != null) {
            throw new BadRequestAlertException("A new digitalAsset cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DigitalAsset result = digitalAssetService.save(digitalAsset);
        return ResponseEntity.created(new URI("/api/digital-assets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /digital-assets} : Updates an existing digitalAsset.
     *
     * @param digitalAsset the digitalAsset to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated digitalAsset,
     * or with status {@code 400 (Bad Request)} if the digitalAsset is not valid,
     * or with status {@code 500 (Internal Server Error)} if the digitalAsset couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/digital-assets")
    public ResponseEntity<DigitalAsset> updateDigitalAsset(@RequestBody DigitalAsset digitalAsset) throws URISyntaxException {
        log.debug("REST request to update DigitalAsset : {}", digitalAsset);
        if (digitalAsset.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DigitalAsset result = digitalAssetService.save(digitalAsset);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, digitalAsset.getId()))
            .body(result);
    }

    /**
     * {@code GET  /digital-assets} : get all the digitalAssets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of digitalAssets in body.
     */
    @GetMapping("/digital-assets")
    public List<DigitalAsset> getAllDigitalAssets() {
        log.debug("REST request to get all DigitalAssets");
        return digitalAssetService.findAll();
    }

    /**
     * {@code GET  /digital-assets/:id} : get the "id" digitalAsset.
     *
     * @param id the id of the digitalAsset to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the digitalAsset, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/digital-assets/{id}")
    public ResponseEntity<DigitalAsset> getDigitalAsset(@PathVariable String id) {
        log.debug("REST request to get DigitalAsset : {}", id);
        Optional<DigitalAsset> digitalAsset = digitalAssetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(digitalAsset);
    }

    /**
     * {@code DELETE  /digital-assets/:id} : delete the "id" digitalAsset.
     *
     * @param id the id of the digitalAsset to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/digital-assets/{id}")
    public ResponseEntity<Void> deleteDigitalAsset(@PathVariable String id) {
        log.debug("REST request to delete DigitalAsset : {}", id);
        digitalAssetService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
