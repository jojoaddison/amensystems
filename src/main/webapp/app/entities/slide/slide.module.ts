import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

<<<<<<< HEAD
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
=======
import { AmensystemSharedModule } from 'app/shared/shared.module';
import { SlideComponent } from './slide.component';
import { SlideDetailComponent } from './slide-detail.component';
import { SlideUpdateComponent } from './slide-update.component';
import { SlideDeleteDialogComponent } from './slide-delete-dialog.component';
import { slideRoute } from './slide.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(slideRoute)],
  declarations: [SlideComponent, SlideDetailComponent, SlideUpdateComponent, SlideDeleteDialogComponent],
  entryComponents: [SlideDeleteDialogComponent],
>>>>>>> jhipster_upgrade
})
export class AmensystemSlideModule {}
