package io.jojoaddison.web.rest;

import io.jojoaddison.AmensystemApp;

import io.jojoaddison.domain.Home;
import io.jojoaddison.repository.HomeRepository;
import io.jojoaddison.service.HomeService;
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

import io.jojoaddison.domain.enumeration.StateType;
/**
 * Test class for the HomeResource REST controller.
 *
 * @see HomeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AmensystemApp.class)
public class HomeResourceIntTest {

    private static final String DEFAULT_SLIDES = "AAAAAAAAAA";
    private static final String UPDATED_SLIDES = "BBBBBBBBBB";

    private static final String DEFAULT_ADVERT = "AAAAAAAAAA";
    private static final String UPDATED_ADVERT = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final StateType DEFAULT_STATE = StateType.CURRENT;
    private static final StateType UPDATED_STATE = StateType.UNPUBLISH;

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private HomeService homeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restHomeMockMvc;

    private Home home;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HomeResource homeResource = new HomeResource(homeService);
        this.restHomeMockMvc = MockMvcBuilders.standaloneSetup(homeResource)
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
    public static Home createEntity() {
        Home home = new Home()
            .slides(DEFAULT_SLIDES)
            .advert(DEFAULT_ADVERT)
            .category(DEFAULT_CATEGORY)
            .state(DEFAULT_STATE)
            .version(DEFAULT_VERSION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedBy(DEFAULT_MODIFIED_BY)
            .modifiedDate(DEFAULT_MODIFIED_DATE);
        return home;
    }

    @Before
    public void initTest() {
        homeRepository.deleteAll();
        home = createEntity();
    }

    @Test
    public void createHome() throws Exception {
        int databaseSizeBeforeCreate = homeRepository.findAll().size();

        // Create the Home
        restHomeMockMvc.perform(post("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(home)))
            .andExpect(status().isCreated());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeCreate + 1);
        Home testHome = homeList.get(homeList.size() - 1);
        assertThat(testHome.getSlides()).isEqualTo(DEFAULT_SLIDES);
        assertThat(testHome.getAdvert()).isEqualTo(DEFAULT_ADVERT);
        assertThat(testHome.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testHome.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testHome.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testHome.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testHome.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testHome.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
        assertThat(testHome.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
    }

    @Test
    public void createHomeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = homeRepository.findAll().size();

        // Create the Home with an existing ID
        home.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restHomeMockMvc.perform(post("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(home)))
            .andExpect(status().isBadRequest());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllHomes() throws Exception {
        // Initialize the database
        homeRepository.save(home);

        // Get all the homeList
        restHomeMockMvc.perform(get("/api/homes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(home.getId())))
            .andExpect(jsonPath("$.[*].slides").value(hasItem(DEFAULT_SLIDES.toString())))
            .andExpect(jsonPath("$.[*].advert").value(hasItem(DEFAULT_ADVERT.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))));
    }

    @Test
    public void getHome() throws Exception {
        // Initialize the database
        homeRepository.save(home);

        // Get the home
        restHomeMockMvc.perform(get("/api/homes/{id}", home.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(home.getId()))
            .andExpect(jsonPath("$.slides").value(DEFAULT_SLIDES.toString()))
            .andExpect(jsonPath("$.advert").value(DEFAULT_ADVERT.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)));
    }

    @Test
    public void getNonExistingHome() throws Exception {
        // Get the home
        restHomeMockMvc.perform(get("/api/homes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHome() throws Exception {
        // Initialize the database
        homeService.save(home);

        int databaseSizeBeforeUpdate = homeRepository.findAll().size();

        // Update the home
        Home updatedHome = homeRepository.findOne(home.getId());
        updatedHome
            .slides(UPDATED_SLIDES)
            .advert(UPDATED_ADVERT)
            .category(UPDATED_CATEGORY)
            .state(UPDATED_STATE)
            .version(UPDATED_VERSION)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedBy(UPDATED_MODIFIED_BY)
            .modifiedDate(UPDATED_MODIFIED_DATE);

        restHomeMockMvc.perform(put("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHome)))
            .andExpect(status().isOk());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeUpdate);
        Home testHome = homeList.get(homeList.size() - 1);
        assertThat(testHome.getSlides()).isEqualTo(UPDATED_SLIDES);
        assertThat(testHome.getAdvert()).isEqualTo(UPDATED_ADVERT);
        assertThat(testHome.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testHome.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testHome.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testHome.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testHome.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testHome.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
        assertThat(testHome.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
    }

    @Test
    public void updateNonExistingHome() throws Exception {
        int databaseSizeBeforeUpdate = homeRepository.findAll().size();

        // Create the Home

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHomeMockMvc.perform(put("/api/homes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(home)))
            .andExpect(status().isCreated());

        // Validate the Home in the database
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteHome() throws Exception {
        // Initialize the database
        homeService.save(home);

        int databaseSizeBeforeDelete = homeRepository.findAll().size();

        // Get the home
        restHomeMockMvc.perform(delete("/api/homes/{id}", home.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Home> homeList = homeRepository.findAll();
        assertThat(homeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Home.class);
        Home home1 = new Home();
        home1.setId("id1");
        Home home2 = new Home();
        home2.setId(home1.getId());
        assertThat(home1).isEqualTo(home2);
        home2.setId("id2");
        assertThat(home1).isNotEqualTo(home2);
        home1.setId(null);
        assertThat(home1).isNotEqualTo(home2);
    }
}
