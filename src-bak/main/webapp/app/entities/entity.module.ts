import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AmensystemSlideModule } from './slide/slide.module';
import { AmensystemNewsModule } from './news/news.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AmensystemSlideModule,
        AmensystemNewsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemEntityModule {}
