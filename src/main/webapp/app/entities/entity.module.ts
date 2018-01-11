import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AmensystemSlideModule } from './slide/slide.module';
import { AmensystemNewsModule } from './news/news.module';
import { AmensystemCategoryModule } from './category/category.module';
import { AmensystemProductModule } from './product/product.module';
import { AmensystemDigitalAssetModule } from './digital-asset/digital-asset.module';
import { AmensystemSlideShowModule } from './slide-show/slide-show.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AmensystemSlideModule,
        AmensystemNewsModule,
        AmensystemCategoryModule,
        AmensystemProductModule,
        AmensystemDigitalAssetModule,
        AmensystemSlideShowModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemEntityModule {}
