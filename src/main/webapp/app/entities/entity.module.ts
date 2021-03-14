import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AmensystemBlogModule } from './blog/blog.module';
import { AmensystemCategoryModule } from './category/category.module';
import { AmensystemDigitalAssetModule } from './digital-asset/digital-asset.module';
import { AmensystemHomeModule } from './home/home.module';
import { AmensystemNewsModule } from './news/news.module';
import { AmensystemProductModule } from './product/product.module';
import { AmensystemSlideModule } from './slide/slide.module';
import { AmensystemSlideShowModule } from './slide-show/slide-show.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AmensystemBlogModule,
        AmensystemCategoryModule,
        AmensystemDigitalAssetModule,
        AmensystemHomeModule,
        AmensystemNewsModule,
        AmensystemProductModule,
        AmensystemSlideModule,
        AmensystemSlideShowModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemEntityModule {}
