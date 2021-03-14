import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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

const ENTITY_STATES = [
    ...homeRoute,
    ...homePopupRoute,
];

@NgModule({
    imports: [
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
})
export class AmensystemHomeModule {}
