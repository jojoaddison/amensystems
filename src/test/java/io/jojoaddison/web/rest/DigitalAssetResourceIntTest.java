package io.jojoaddison.web.rest;

import io.jojoaddison.AmensystemApp;

import io.jojoaddison.domain.DigitalAsset;
import io.jojoaddison.repository.DigitalAssetRepository;
import io.jojoaddison.service.DigitalAssetService;
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
import org.springframework.util.Base64Utils;

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
 * Test class for the DigitalAssetResource REST controller.
 *
 * @see DigitalAssetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AmensystemApp.class)
public class DigitalAssetResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final byte[] DEFAULT_RESOURCE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RESOURCE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_RESOURCE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RESOURCE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private DigitalAssetRepository digitalAssetRepository;

    @Autowired
    private DigitalAssetService digitalAssetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restDigitalAssetMockMvc;

    private DigitalAsset digitalAsset;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DigitalAssetResource digitalAssetResource = new DigitalAssetResource(digitalAssetService);
        this.restDigitalAssetMockMvc = MockMvcBuilders.standaloneSetup(digitalAssetResource)
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
    public static DigitalAsset createEntity() {
        DigitalAsset digitalAsset = new DigitalAsset()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .url(DEFAULT_URL)
            .resource(DEFAULT_RESOURCE)
            .resourceContentType(DEFAULT_RESOURCE_CONTENT_TYPE)
            .type(DEFAULT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return digitalAsset;
    }

    @Before
    public void initTest() {
        digitalAssetRepository.deleteAll();
        digitalAsset = createEntity();
    }

    @Test
    public void createDigitalAsset() throws Exception {
        int databaseSizeBeforeCreate = digitalAssetRepository.findAll().size();

        // Create the DigitalAsset
        restDigitalAssetMockMvc.perform(post("/api/digital-assets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(digitalAsset)))
            .andExpect(status().isCreated());

        // Validate the DigitalAsset in the database
        List<DigitalAsset> digitalAssetList = digitalAssetRepository.findAll();
        assertThat(digitalAssetList).hasSize(databaseSizeBeforeCreate + 1);
        DigitalAsset testDigitalAsset = digitalAssetList.get(digitalAssetList.size() - 1);
        assertThat(testDigitalAsset.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDigitalAsset.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDigitalAsset.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testDigitalAsset.getResource()).isEqualTo(DEFAULT_RESOURCE);
        assertThat(testDigitalAsset.getResourceContentType()).isEqualTo(DEFAULT_RESOURCE_CONTENT_TYPE);
        assertThat(testDigitalAsset.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testDigitalAsset.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testDigitalAsset.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
        assertThat(testDigitalAsset.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testDigitalAsset.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    public void createDigitalAssetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = digitalAssetRepository.findAll().size();

        // Create the DigitalAsset with an existing ID
        digitalAsset.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDigitalAssetMockMvc.perform(post("/api/digital-assets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(digitalAsset)))
            .andExpect(status().isBadRequest());

        // Validate the DigitalAsset in the database
        List<DigitalAsset> digitalAssetList = digitalAssetRepository.findAll();
        assertThat(digitalAssetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllDigitalAssets() throws Exception {
        // Initialize the database
        digitalAssetRepository.save(digitalAsset);

        // Get all the digitalAssetList
        restDigitalAssetMockMvc.perform(get("/api/digital-assets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(digitalAsset.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].resourceContentType").value(hasItem(DEFAULT_RESOURCE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].resource").value(hasItem(Base64Utils.encodeToString(DEFAULT_RESOURCE))))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())));
    }

    @Test
    public void getDigitalAsset() throws Exception {
        // Initialize the database
        digitalAssetRepository.save(digitalAsset);

        // Get the digitalAsset
        restDigitalAssetMockMvc.perform(get("/api/digital-assets/{id}", digitalAsset.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(digitalAsset.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.resourceContentType").value(DEFAULT_RESOURCE_CONTENT_TYPE))
            .andExpect(jsonPath("$.resource").value(Base64Utils.encodeToString(DEFAULT_RESOURCE)))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()));
    }

    @Test
    public void getNonExistingDigitalAsset() throws Exception {
        // Get the digitalAsset
        restDigitalAssetMockMvc.perform(get("/api/digital-assets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDigitalAsset() throws Exception {
        // Initialize the database
        digitalAssetService.save(digitalAsset);

        int databaseSizeBeforeUpdate = digitalAssetRepository.findAll().size();

        // Update the digitalAsset
        DigitalAsset updatedDigitalAsset = digitalAssetRepository.findOne(digitalAsset.getId());
        updatedDigitalAsset
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .url(UPDATED_URL)
            .resource(UPDATED_RESOURCE)
            .resourceContentType(UPDATED_RESOURCE_CONTENT_TYPE)
            .type(UPDATED_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restDigitalAssetMockMvc.perform(put("/api/digital-assets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDigitalAsset)))
            .andExpect(status().isOk());

        // Validate the DigitalAsset in the database
        List<DigitalAsset> digitalAssetList = digitalAssetRepository.findAll();
        assertThat(digitalAssetList).hasSize(databaseSizeBeforeUpdate);
        DigitalAsset testDigitalAsset = digitalAssetList.get(digitalAssetList.size() - 1);
        assertThat(testDigitalAsset.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDigitalAsset.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDigitalAsset.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testDigitalAsset.getResource()).isEqualTo(UPDATED_RESOURCE);
        assertThat(testDigitalAsset.getResourceContentType()).isEqualTo(UPDATED_RESOURCE_CONTENT_TYPE);
        assertThat(testDigitalAsset.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDigitalAsset.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testDigitalAsset.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
        assertThat(testDigitalAsset.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testDigitalAsset.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    public void updateNonExistingDigitalAsset() throws Exception {
        int databaseSizeBeforeUpdate = digitalAssetRepository.findAll().size();

        // Create the DigitalAsset

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDigitalAssetMockMvc.perform(put("/api/digital-assets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(digitalAsset)))
            .andExpect(status().isCreated());

        // Validate the DigitalAsset in the database
        List<DigitalAsset> digitalAssetList = digitalAssetRepository.findAll();
        assertThat(digitalAssetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteDigitalAsset() throws Exception {
        // Initialize the database
        digitalAssetService.save(digitalAsset);

        int databaseSizeBeforeDelete = digitalAssetRepository.findAll().size();

        // Get the digitalAsset
        restDigitalAssetMockMvc.perform(delete("/api/digital-assets/{id}", digitalAsset.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DigitalAsset> digitalAssetList = digitalAssetRepository.findAll();
        assertThat(digitalAssetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DigitalAsset.class);
        DigitalAsset digitalAsset1 = new DigitalAsset();
        digitalAsset1.setId("id1");
        DigitalAsset digitalAsset2 = new DigitalAsset();
        digitalAsset2.setId(digitalAsset1.getId());
        assertThat(digitalAsset1).isEqualTo(digitalAsset2);
        digitalAsset2.setId("id2");
        assertThat(digitalAsset1).isNotEqualTo(digitalAsset2);
        digitalAsset1.setId(null);
        assertThat(digitalAsset1).isNotEqualTo(digitalAsset2);
    }
}
