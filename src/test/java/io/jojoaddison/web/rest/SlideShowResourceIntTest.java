package io.jojoaddison.web.rest;

import io.jojoaddison.AmensystemApp;

import io.jojoaddison.domain.SlideShow;
import io.jojoaddison.repository.SlideShowRepository;
import io.jojoaddison.web.rest.errors.ExceptionTranslator;

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

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static io.jojoaddison.web.rest.TestUtil.sameInstant;
import static io.jojoaddison.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SlideShowResource REST controller.
 *
 * @see SlideShowResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AmensystemApp.class)
public class SlideShowResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SLIDES = "AAAAAAAAAA";
    private static final String UPDATED_SLIDES = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private SlideShowRepository slideShowRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restSlideShowMockMvc;

    private SlideShow slideShow;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SlideShowResource slideShowResource = new SlideShowResource(slideShowRepository);
        this.restSlideShowMockMvc = MockMvcBuilders.standaloneSetup(slideShowResource)
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
    public static SlideShow createEntity() {
        SlideShow slideShow = new SlideShow()
            .name(DEFAULT_NAME)
            .slides(DEFAULT_SLIDES)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return slideShow;
    }

    @Before
    public void initTest() {
        slideShowRepository.deleteAll();
        slideShow = createEntity();
    }

    @Test
    public void createSlideShow() throws Exception {
        int databaseSizeBeforeCreate = slideShowRepository.findAll().size();

        // Create the SlideShow
        restSlideShowMockMvc.perform(post("/api/slide-shows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slideShow)))
            .andExpect(status().isCreated());

        // Validate the SlideShow in the database
        List<SlideShow> slideShowList = slideShowRepository.findAll();
        assertThat(slideShowList).hasSize(databaseSizeBeforeCreate + 1);
        SlideShow testSlideShow = slideShowList.get(slideShowList.size() - 1);
        assertThat(testSlideShow.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSlideShow.getSlides()).isEqualTo(DEFAULT_SLIDES);
        assertThat(testSlideShow.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testSlideShow.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testSlideShow.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    public void createSlideShowWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = slideShowRepository.findAll().size();

        // Create the SlideShow with an existing ID
        slideShow.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSlideShowMockMvc.perform(post("/api/slide-shows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slideShow)))
            .andExpect(status().isBadRequest());

        // Validate the SlideShow in the database
        List<SlideShow> slideShowList = slideShowRepository.findAll();
        assertThat(slideShowList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllSlideShows() throws Exception {
        // Initialize the database
        slideShowRepository.save(slideShow);

        // Get all the slideShowList
        restSlideShowMockMvc.perform(get("/api/slide-shows?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slideShow.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].slides").value(hasItem(DEFAULT_SLIDES.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())));
    }

    @Test
    public void getSlideShow() throws Exception {
        // Initialize the database
        slideShowRepository.save(slideShow);

        // Get the slideShow
        restSlideShowMockMvc.perform(get("/api/slide-shows/{id}", slideShow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(slideShow.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.slides").value(DEFAULT_SLIDES.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingSlideShow() throws Exception {
        // Get the slideShow
        restSlideShowMockMvc.perform(get("/api/slide-shows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSlideShow() throws Exception {
        // Initialize the database
        slideShowRepository.save(slideShow);
        int databaseSizeBeforeUpdate = slideShowRepository.findAll().size();

        // Update the slideShow
        SlideShow updatedSlideShow = slideShowRepository.findOne(slideShow.getId());
        updatedSlideShow
            .name(UPDATED_NAME)
            .slides(UPDATED_SLIDES)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restSlideShowMockMvc.perform(put("/api/slide-shows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSlideShow)))
            .andExpect(status().isOk());

        // Validate the SlideShow in the database
        List<SlideShow> slideShowList = slideShowRepository.findAll();
        assertThat(slideShowList).hasSize(databaseSizeBeforeUpdate);
        SlideShow testSlideShow = slideShowList.get(slideShowList.size() - 1);
        assertThat(testSlideShow.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSlideShow.getSlides()).isEqualTo(UPDATED_SLIDES);
        assertThat(testSlideShow.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testSlideShow.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testSlideShow.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    public void updateNonExistingSlideShow() throws Exception {
        int databaseSizeBeforeUpdate = slideShowRepository.findAll().size();

        // Create the SlideShow

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSlideShowMockMvc.perform(put("/api/slide-shows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(slideShow)))
            .andExpect(status().isCreated());

        // Validate the SlideShow in the database
        List<SlideShow> slideShowList = slideShowRepository.findAll();
        assertThat(slideShowList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteSlideShow() throws Exception {
        // Initialize the database
        slideShowRepository.save(slideShow);
        int databaseSizeBeforeDelete = slideShowRepository.findAll().size();

        // Get the slideShow
        restSlideShowMockMvc.perform(delete("/api/slide-shows/{id}", slideShow.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SlideShow> slideShowList = slideShowRepository.findAll();
        assertThat(slideShowList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SlideShow.class);
        SlideShow slideShow1 = new SlideShow();
        slideShow1.setId("id1");
        SlideShow slideShow2 = new SlideShow();
        slideShow2.setId(slideShow1.getId());
        assertThat(slideShow1).isEqualTo(slideShow2);
        slideShow2.setId("id2");
        assertThat(slideShow1).isNotEqualTo(slideShow2);
        slideShow1.setId(null);
        assertThat(slideShow1).isNotEqualTo(slideShow2);
    }
}
