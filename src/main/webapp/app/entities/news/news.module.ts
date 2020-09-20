import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from '../../shared';
import {
    NewsService,
    NewsPopupService,
    NewsComponent,
    NewsDetailComponent,
    NewsDialogComponent,
    NewsPopupComponent,
    NewsDeletePopupComponent,
    NewsDeleteDialogComponent,
    newsRoute,
    newsPopupRoute,
    NewsResolvePagingParams,
    NewsViewComponent,
} from './';
import { WidgetsModule } from '../../widgets/widgets.module';

const ENTITY_STATES = [
    ...newsRoute,
    ...newsPopupRoute,
];

@NgModule({
    imports: [
        AmensystemSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        WidgetsModule
    ],
    declarations: [
        NewsComponent,
        NewsViewComponent,
        NewsDetailComponent,
        NewsDialogComponent,
        NewsDeleteDialogComponent,
        NewsPopupComponent,
        NewsDeletePopupComponent,
    ],
    entryComponents: [
        NewsComponent,
        NewsDialogComponent,
        NewsPopupComponent,
        NewsDeleteDialogComponent,
        NewsDeletePopupComponent,
    ],
    providers: [
        NewsService,
        NewsPopupService,
        NewsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemNewsModule {}
