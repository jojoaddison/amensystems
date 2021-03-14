package io.jojoaddison;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("io.jojoaddison");

        noClasses()
            .that()
                .resideInAnyPackage("io.jojoaddison.service..")
            .or()
                .resideInAnyPackage("io.jojoaddison.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..io.jojoaddison.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
