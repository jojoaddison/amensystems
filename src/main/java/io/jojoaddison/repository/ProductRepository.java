package io.jojoaddison.repository;

import io.jojoaddison.domain.Product;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Product entity.
 */
@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
<<<<<<< HEAD

    List<Product> findByCategory(String category);
=======
>>>>>>> jhipster_upgrade
}
