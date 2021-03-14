import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

<<<<<<< HEAD
import { AmensystemSharedModule } from '../../shared';
import {
    HomeService,
    HomePopupService,
    HomeComponent,
    HomeDetailComponent,
    HomeDialogComponent,
    HomePopupComponent,
    HomeDeletePopupComponent,
    HomeDeleteDialogComponent,
    homeRoute,
    homePopupRoute,
} from './';
import { WidgetsModule } from '../../widgets/widgets.module';

const ENTITY_STATES = [
    ...homeRoute,
    ...homePopupRoute,
];

@NgModule({
    imports: [
        WidgetsModule,
        AmensystemSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HomeComponent,
        HomeDetailComponent,
        HomeDialogComponent,
        HomeDeleteDialogComponent,
        HomePopupComponent,
        HomeDeletePopupComponent,
    ],
    entryComponents: [
        HomeComponent,
        HomeDialogComponent,
        HomePopupComponent,
        HomeDeleteDialogComponent,
        HomeDeletePopupComponent,
    ],
    providers: [
        HomeService,
        HomePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
=======
import { AmensystemSharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeDetailComponent } from './home-detail.component';
import { HomeUpdateComponent } from './home-update.component';
import { HomeDeleteDialogComponent } from './home-delete-dialog.component';
import { homeRoute } from './home.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(homeRoute)],
  declarations: [HomeComponent, HomeDetailComponent, HomeUpdateComponent, HomeDeleteDialogComponent],
  entryComponents: [HomeDeleteDialogComponent],
>>>>>>> jhipster_upgrade
})
export class AmensystemHomeModule {}
