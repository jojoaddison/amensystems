package io.jojoaddison.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.ZonedDateTime;

import io.jojoaddison.domain.enumeration.StateType;

/**
 * A Home.
 */
@Document(collection = "home")
public class Home implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("slides")
    private String slides;

    @Field("advert")
    private String advert;

    @Field("category")
    private String category;

    @Field("state")
    private StateType state;

    @Field("version")
    private Integer version;

    @Field("created_by")
    private String createdBy;

    @Field("created_date")
    private ZonedDateTime createdDate;

    @Field("modified_by")
    private String modifiedBy;

    @Field("modified_date")
    private ZonedDateTime modifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSlides() {
        return slides;
    }

    public Home slides(String slides) {
        this.slides = slides;
        return this;
    }

    public void setSlides(String slides) {
        this.slides = slides;
    }

    public String getAdvert() {
        return advert;
    }

    public Home advert(String advert) {
        this.advert = advert;
        return this;
    }

    public void setAdvert(String advert) {
        this.advert = advert;
    }

    public String getCategory() {
        return category;
    }

    public Home category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public StateType getState() {
        return state;
    }

    public Home state(StateType state) {
        this.state = state;
        return this;
    }

    public void setState(StateType state) {
        this.state = state;
    }

    public Integer getVersion() {
        return version;
    }

    public Home version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Home createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Home createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Home modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public Home modifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Home)) {
            return false;
        }
        return id != null && id.equals(((Home) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Home{" +
            "id=" + getId() +
            ", slides='" + getSlides() + "'" +
            ", advert='" + getAdvert() + "'" +
            ", category='" + getCategory() + "'" +
            ", state='" + getState() + "'" +
            ", version=" + getVersion() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            "}";
    }
}
