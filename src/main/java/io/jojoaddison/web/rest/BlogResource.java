package io.jojoaddison.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jojoaddison.domain.Blog;

import io.jojoaddison.repository.BlogRepository;
import io.jojoaddison.web.rest.errors.BadRequestAlertException;
import io.jojoaddison.web.rest.util.HeaderUtil;
import io.jojoaddison.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Blog.
 */
@RestController
@RequestMapping("/api")
public class BlogResource {

    private final Logger log = LoggerFactory.getLogger(BlogResource.class);

    private static final String ENTITY_NAME = "blog";

    private final BlogRepository blogRepository;

    public BlogResource(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    /**
     * POST  /blogs : Create a new blog.
     *
     * @param blog the blog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blog, or with status 400 (Bad Request) if the blog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blogs")
    @Timed
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to save Blog : {}", blog);
        if (blog.getId() != null) {
            throw new BadRequestAlertException("A new blog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Blog result = blogRepository.save(blog);
        return ResponseEntity.created(new URI("/api/blogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blogs : Updates an existing blog.
     *
     * @param blog the blog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blog,
     * or with status 400 (Bad Request) if the blog is not valid,
     * or with status 500 (Internal Server Error) if the blog couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blogs")
    @Timed
    public ResponseEntity<Blog> updateBlog(@RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to update Blog : {}", blog);
        if (blog.getId() == null) {
            return createBlog(blog);
        }
        Blog result = blogRepository.save(blog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @GetMapping("/blogs")
    @Timed
    public ResponseEntity<List<Blog>> getAllBlogs(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Blogs");
        Page<Blog> page = blogRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blogs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /blogs/:id : get the "id" blog.
     *
     * @param id the id of the blog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blog, or with status 404 (Not Found)
     */
    @GetMapping("/blogs/{id}")
    @Timed
    public ResponseEntity<Blog> getBlog(@PathVariable String id) {
        log.debug("REST request to get Blog : {}", id);
        Blog blog = blogRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blog));
    }

    /**
     * DELETE  /blogs/:id : delete the "id" blog.
     *
     * @param id the id of the blog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blogs/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        log.debug("REST request to delete Blog : {}", id);
        blogRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
