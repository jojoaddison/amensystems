package io.jojoaddison.web.rest;

import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
import static io.jojoaddison.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Base64Utils;

import io.jojoaddison.AmensystemApp;
import io.jojoaddison.domain.Slide;
import io.jojoaddison.service.SlideService;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

/**
 * Test class for the SlideResource REST controller.
 *
 * @see SlideResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AmensystemApp.class)
public class SlideResourceIntTest {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LAST_MODIFIED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_MODIFIED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private SlideService slideRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restSlideMockMvc;

    private Slide slide;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SlideResource slideResource = new SlideResource(slideRepository);
        this.restSlideMockMvc = MockMvcBuilders.standaloneSetup(slideResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Slide createEntity() {
        Slide slide = new Slide()
            .url(DEFAULT_URL)
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModified(DEFAULT_LAST_MODIFIED)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return slide;
    }

    @Before
    public void initTest() {
        slideRepository.deleteAll();
        slide = createEntity();
    }

    @Test
    public void createSlide() throws Exception {
        int databaseSizeBeforeCreate = slideRepository.findAll().size();

        // Create the Slide
        restSlideMockMvc.perform(post("/api/slides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slide)))
            .andExpect(status().isCreated());

        // Validate the Slide in the database
        List<Slide> slideList = slideRepository.findAll();
        assertThat(slideList).hasSize(databaseSizeBeforeCreate + 1);
        Slide testSlide = slideList.get(slideList.size() - 1);
        assertThat(testSlide.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testSlide.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSlide.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSlide.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testSlide.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testSlide.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testSlide.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testSlide.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    public void createSlideWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = slideRepository.findAll().size();

        // Create the Slide with an existing ID
        slide.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSlideMockMvc.perform(post("/api/slides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slide)))
            .andExpect(status().isBadRequest());

        // Validate the Slide in the database
        List<Slide> slideList = slideRepository.findAll();
        assertThat(slideList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllSlides() throws Exception {
        // Initialize the database
        slideRepository.save(slide);

        // Get all the slideList
        restSlideMockMvc.perform(get("/api/slides?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slide.getId())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(sameInstant(DEFAULT_LAST_MODIFIED))))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())));
    }

    @Test
    public void getSlide() throws Exception {
        // Initialize the database
        slideRepository.save(slide);

        // Get the slide
        restSlideMockMvc.perform(get("/api/slides/{id}", slide.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(slide.getId()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.lastModified").value(sameInstant(DEFAULT_LAST_MODIFIED)))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingSlide() throws Exception {
        // Get the slide
        restSlideMockMvc.perform(get("/api/slides/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSlide() throws Exception {
        // Initialize the database
        slideRepository.save(slide);
        int databaseSizeBeforeUpdate = slideRepository.findAll().size();

        // Update the slide
        Slide updatedSlide = slideRepository.findOne(slide.getId());
        updatedSlide
            .url(UPDATED_URL)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restSlideMockMvc.perform(put("/api/slides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSlide)))
            .andExpect(status().isOk());

        // Validate the Slide in the database
        List<Slide> slideList = slideRepository.findAll();
        assertThat(slideList).hasSize(databaseSizeBeforeUpdate);
        Slide testSlide = slideList.get(slideList.size() - 1);
        assertThat(testSlide.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testSlide.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSlide.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSlide.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testSlide.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testSlide.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testSlide.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testSlide.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    public void updateNonExistingSlide() throws Exception {
        int databaseSizeBeforeUpdate = slideRepository.findAll().size();

        // Create the Slide

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSlideMockMvc.perform(put("/api/slides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slide)))
            .andExpect(status().isCreated());

        // Validate the Slide in the database
        List<Slide> slideList = slideRepository.findAll();
        assertThat(slideList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteSlide() throws Exception {
        // Initialize the database
        slideRepository.save(slide);
        int databaseSizeBeforeDelete = slideRepository.findAll().size();

        // Get the slide
        restSlideMockMvc.perform(delete("/api/slides/{id}", slide.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Slide> slideList = slideRepository.findAll();
        assertThat(slideList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Slide.class);
        Slide slide1 = new Slide();
        slide1.setId("id1");
        Slide slide2 = new Slide();
        slide2.setId(slide1.getId());
        assertThat(slide1).isEqualTo(slide2);
        slide2.setId("id2");
        assertThat(slide1).isNotEqualTo(slide2);
        slide1.setId(null);
        assertThat(slide1).isNotEqualTo(slide2);
    }
}
