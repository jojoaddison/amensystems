import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from '../../shared';
import {
    SlideShowService,
    SlideShowPopupService,
    SlideShowComponent,
    SlideShowDetailComponent,
    SlideShowDialogComponent,
    SlideShowPopupComponent,
    SlideShowDeletePopupComponent,
    SlideShowDeleteDialogComponent,
    slideShowRoute,
    slideShowPopupRoute,
} from './';

const ENTITY_STATES = [
    ...slideShowRoute,
    ...slideShowPopupRoute,
];

@NgModule({
    imports: [
        AmensystemSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SlideShowComponent,
        SlideShowDetailComponent,
        SlideShowDialogComponent,
        SlideShowDeleteDialogComponent,
        SlideShowPopupComponent,
        SlideShowDeletePopupComponent,
    ],
    entryComponents: [
        SlideShowComponent,
        SlideShowDialogComponent,
        SlideShowPopupComponent,
        SlideShowDeleteDialogComponent,
        SlideShowDeletePopupComponent,
    ],
    providers: [
        SlideShowService,
        SlideShowPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemSlideShowModule {}
