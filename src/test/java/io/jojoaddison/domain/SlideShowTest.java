package io.jojoaddison.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.jojoaddison.web.rest.TestUtil;

public class SlideShowTest {

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
