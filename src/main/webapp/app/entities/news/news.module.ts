import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

<<<<<<< HEAD
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
=======
import { AmensystemSharedModule } from 'app/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsUpdateComponent } from './news-update.component';
import { NewsDeleteDialogComponent } from './news-delete-dialog.component';
import { newsRoute } from './news.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(newsRoute)],
  declarations: [NewsComponent, NewsDetailComponent, NewsUpdateComponent, NewsDeleteDialogComponent],
  entryComponents: [NewsDeleteDialogComponent],
>>>>>>> jhipster_upgrade
})
export class AmensystemNewsModule {}
