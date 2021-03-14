package io.jojoaddison.service;

import com.mongodb.gridfs.GridFSDBFile;
import io.jojoaddison.domain.Category;
import io.jojoaddison.domain.Slide;
import io.jojoaddison.repository.CategoryRepository;
import io.jojoaddison.service.util.Tools;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
<<<<<<< HEAD
import org.springframework.core.env.Environment;
=======

>>>>>>> jhipster_upgrade
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

=======
import java.util.Optional;
>>>>>>> jhipster_upgrade

/**
 * Service Implementation for managing {@link Category}.
 */
@Service
public class CategoryService {

    private final Logger log = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;
    private final GridFsTemplate gridFsTemplate;
    private final Environment environment;
    private final String ROOT_DIR = "content-directory";
    private final String CATEGORY_DIR = "category";
    private final String CATEGORY_ID = "categoryId";

    public CategoryService(CategoryRepository categoryRepository, GridFsTemplate gridFsTemplate, Environment environment) {
        this.categoryRepository = categoryRepository;
        this.gridFsTemplate = gridFsTemplate;
        this.environment = environment;
    }

    /**
     * Save a category.
     *
     * @param category the entity to save.
     * @return the persisted entity.
     */
    public Category save(Category category) {
        log.debug("Request to save Category : {}", category);
        try {
            byte [] photo = category.getPhoto();
            ByteArrayInputStream is = new ByteArrayInputStream(photo);
            category = categoryRepository.save(category);
            category = createFile(category);

            Optional<GridFSDBFile> categoryFile = findFileByMetadata(CATEGORY_ID, category.getId());
            if (!categoryFile.isPresent()) {
                Map<String, String> data = new HashMap<>();
                data.put(CATEGORY_ID, category.getId());
                gridFsTemplate.store(is, category.getLink(), category.getPhotoContentType(), data);
            }
            is.close();
        }catch(IOException ioe) {
            ioe.printStackTrace();
        }
        return categoryRepository.save(category);
    }


    private Category createFile(Category category){
        try{
            String fileExt = category.getPhotoContentType().split("/")[1];
            String root = environment.getProperty(ROOT_DIR);
            String directory = root.concat(Tools.getSeparator()).concat(CATEGORY_DIR);
            String filename = ("category_").concat(category.getId()).concat(".").concat(fileExt);
            String path = directory.concat(Tools.getSeparator()).concat(filename);
            Tools.createFile(path, category.getPhoto());
            String url = ("content").concat(Tools.getSeparator()).concat(CATEGORY_DIR).concat(Tools.getSeparator()).concat(filename);
            category.setLink(url);
            category.setPhoto(null);
            category = categoryRepository.save(category);
        }catch(IOException ioe) {
            ioe.printStackTrace();
        }
        return category;
    }

    private Optional<GridFSDBFile> findFileByMetadata(String key, String value) {
        GridFSDBFile file = gridFsTemplate.findOne(getQueryByMetadata(key, value));
        return Optional.ofNullable(file);
    }

    private static Query getQueryByMetadata(String key, String value) {
        return Query.query(GridFsCriteria.whereMetaData(key).is(value));
    }

    private static Query getFilenameQuery(String fileName) {
        return Query.query(GridFsCriteria.whereMetaData("slideId").is(fileName));
    }
    /**
     *  Get all the categories.
     *
     *  @return the list of entities
     */
    public List<Category> findAll() {
        log.debug("Request to get list of Categories");
        return categoryRepository.findAll();
    }
    /**
     * Get all the categories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Category> findAll(Pageable pageable) {
        log.debug("Request to get all Categories");
        return categoryRepository.findAll(pageable);
    }


    /**
     * Get one category by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Category> findOne(String id) {
        log.debug("Request to get Category : {}", id);
        return categoryRepository.findById(id);
    }

    /**
     * Delete the category by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Category : {}", id);
        categoryRepository.deleteById(id);
    }

    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }
}
