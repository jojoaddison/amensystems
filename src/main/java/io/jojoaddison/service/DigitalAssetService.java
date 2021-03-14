package io.jojoaddison.service;

import io.jojoaddison.domain.DigitalAsset;
import io.jojoaddison.repository.DigitalAssetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing DigitalAsset.
 */
@Service
public class DigitalAssetService {

    private final Logger log = LoggerFactory.getLogger(DigitalAssetService.class);

    private final DigitalAssetRepository digitalAssetRepository;

    public DigitalAssetService(DigitalAssetRepository digitalAssetRepository) {
        this.digitalAssetRepository = digitalAssetRepository;
    }

    /**
     * Save a digitalAsset.
     *
     * @param digitalAsset the entity to save
     * @return the persisted entity
     */
    public DigitalAsset save(DigitalAsset digitalAsset) {
        log.debug("Request to save DigitalAsset : {}", digitalAsset);
        return digitalAssetRepository.save(digitalAsset);
    }

    /**
     *  Get all the digitalAssets.
     *
     *  @return the list of entities
     */
    public List<DigitalAsset> findAll() {
        log.debug("Request to get all DigitalAssets");
        return digitalAssetRepository.findAll();
    }

    /**
     *  Get one digitalAsset by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public DigitalAsset findOne(String id) {
        log.debug("Request to get DigitalAsset : {}", id);
        return digitalAssetRepository.findOne(id);
    }

    /**
     *  Delete the  digitalAsset by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete DigitalAsset : {}", id);
        digitalAssetRepository.delete(id);
    }
}
