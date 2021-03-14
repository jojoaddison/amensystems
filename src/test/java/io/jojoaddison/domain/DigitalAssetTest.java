package io.jojoaddison.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.jojoaddison.web.rest.TestUtil;

public class DigitalAssetTest {

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
