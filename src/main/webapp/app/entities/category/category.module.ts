import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

<<<<<<< HEAD
import { AmensystemSharedModule } from '../../shared';
import {
    CategoryService,
    CategoryPopupService,
    CategoryComponent,
    CategoryDetailComponent,
    CategoryDialogComponent,
    CategoryPopupComponent,
    CategoryDeletePopupComponent,
    CategoryDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
    CategoryResolvePagingParams,
    CategoryViewComponent,
    TinyEditorComponent
} from './';
import { WidgetsModule } from '../../widgets/widgets.module';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        AmensystemSharedModule,
        WidgetsModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CategoryComponent,
        CategoryDetailComponent,
        CategoryDialogComponent,
        CategoryDeleteDialogComponent,
        CategoryPopupComponent,
        CategoryDeletePopupComponent,
        TinyEditorComponent,
        CategoryViewComponent
    ],
    entryComponents: [
        CategoryComponent,
        CategoryDialogComponent,
        CategoryPopupComponent,
        CategoryDeleteDialogComponent,
        CategoryDeletePopupComponent,
        CategoryViewComponent
    ],
    providers: [
        CategoryService,
        CategoryPopupService,
        CategoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
=======
import { AmensystemSharedModule } from 'app/shared/shared.module';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryUpdateComponent } from './category-update.component';
import { CategoryDeleteDialogComponent } from './category-delete-dialog.component';
import { categoryRoute } from './category.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(categoryRoute)],
  declarations: [CategoryComponent, CategoryDetailComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent],
  entryComponents: [CategoryDeleteDialogComponent],
>>>>>>> jhipster_upgrade
})
export class AmensystemCategoryModule {}
