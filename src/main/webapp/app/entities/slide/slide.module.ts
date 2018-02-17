import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from '../../shared';
import {
    SlideService,
    SlidePopupService,
    SlideComponent,
    SlideDetailComponent,
    SlideDialogComponent,
    SlidePopupComponent,
    SlideDeletePopupComponent,
    SlideDeleteDialogComponent,
    slideRoute,
    slidePopupRoute,
} from './';
import { WidgetsModule } from '../../widgets/widgets.module';

const ENTITY_STATES = [
    ...slideRoute,
    ...slidePopupRoute,
];

@NgModule({
    imports: [
        AmensystemSharedModule,
        WidgetsModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SlideComponent,
        SlideDetailComponent,
        SlideDialogComponent,
        SlideDeleteDialogComponent,
        SlidePopupComponent,
        SlideDeletePopupComponent,
    ],
    entryComponents: [
        SlideComponent,
        SlideDialogComponent,
        SlidePopupComponent,
        SlideDeleteDialogComponent,
        SlideDeletePopupComponent,
    ],
    providers: [
        SlideService,
        SlidePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemSlideModule {}
