package io.jojoaddison.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import com.mongodb.gridfs.GridFSDBFile;

import io.jojoaddison.domain.Slide;
import io.jojoaddison.repository.SlideRepository;

/**
 * Service Implementation for managing Slide.
 */
@Service
public class SlideService {

	private final Logger log = LoggerFactory.getLogger(SlideService.class);

	private final SlideRepository slideRepository;
	private final GridFsTemplate gridFsTemplate;

	public SlideService(SlideRepository slideRepository, GridFsTemplate gridFsTemplate) {
		this.slideRepository = slideRepository;
		this.gridFsTemplate = gridFsTemplate;
	}

	/**
	 * Save a Slide.
	 *
	 * @param Slide
	 *            the entity to save
	 * @return the persisted entity
	 */
	public Slide save(Slide slide) {
		log.debug("Request to save slide : {}", slide);
		try {
		ByteArrayInputStream is = new ByteArrayInputStream(slide.getPhoto());
		slide.setPhoto(null);
		slide = slideRepository.save(slide);

		Optional<GridFSDBFile> slideFile = findFileByMetadata("slideId", slide.getId());

		if (!slideFile.isPresent()) {
			Map<String, String> data = new HashMap<>();
			data.put("title", slide.getTitle());
			data.put("slideId", slide.getId());
			gridFsTemplate.store(is, slide.getPhotoFile(), slide.getPhotoContentType(), data);
		}
		is.close();
		}catch(IOException ioe) {
			ioe.printStackTrace();
		}
		return slide;
	}

	public Slide update(Slide slide) {
		log.debug("Request to save slide : {}", slide);
		slide = slideRepository.save(slide);

		Optional<GridFSDBFile> slideFile = findFileByMetadata("slideId", slide.getId());

		if (slideFile.isPresent()) {
			gridFsTemplate.delete(getQueryByMetadata("slideId", slide.getId()));
		}

		Map<String, String> data = new HashMap<>();
		data.put("title", slide.getTitle());
		data.put("slideId", slide.getId());
		gridFsTemplate.store(new ByteArrayInputStream(slide.getPhoto()), slide.getPhotoFile(),
				slide.getPhotoContentType(), data);

		return slide;
	}

	/**
	 * Get all the categories.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	public Page<Slide> findAll(Pageable pageable) {
		log.debug("Request to get all Categories");

		Page<Slide> slides = slideRepository.findAll(pageable);

		try {
			for (Slide s : slides) {
				Optional<GridFSDBFile> slideFile = findFileByMetadata("slideId", s.getId());
				if (slideFile.isPresent()) {
					ByteArrayOutputStream os = new ByteArrayOutputStream();
					GridFSDBFile fs = slideFile.get();
					fs.writeTo(os);
					s.setPhoto(os.toByteArray());
					os.close();
				}
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return slides;
	}

	/**
	 * Get one Slide by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	public Slide findOne(String id) {
		log.debug("Request to get Slide : {}", id);
		Slide slide = slideRepository.findOne(id);
		if(slide != null) {
			try {
			Optional<GridFSDBFile> slideFile = findFileByMetadata("slideId", slide.getId());
			if (slideFile.isPresent()) {
				ByteArrayOutputStream os = new ByteArrayOutputStream();
				GridFSDBFile fs = slideFile.get();
					fs.writeTo(os);
				slide.setPhoto(os.toByteArray());
				os.close();
			}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return slide;
	}

	/**
	 * Delete the Slide by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	public void delete(String id) {
		log.debug("Request to delete Slide : {}", id);
		slideRepository.delete(id);
	}

	private List<GridFSDBFile> getFiles() {
		return gridFsTemplate.find(null);
	}

	private Optional<GridFSDBFile> maybeLoadFile(String name) {
		GridFSDBFile file = gridFsTemplate.findOne(getFilenameQuery(name));
		return Optional.ofNullable(file);
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

	public List<Slide> findAll() {
		return slideRepository.findAll();
	}

	public void deleteAll() {
		slideRepository.deleteAll();
	}

}
