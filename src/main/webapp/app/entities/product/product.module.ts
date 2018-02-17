import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from '../../shared';
import {
    ProductService,
    ProductPopupService,
    ProductComponent,
    ProductDetailComponent,
    ProductDialogComponent,
    ProductPopupComponent,
    ProductDeletePopupComponent,
    ProductDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';
import { WidgetsModule } from '../../widgets/widgets.module';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        AmensystemSharedModule,
        WidgetsModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductDialogComponent,
        ProductDeleteDialogComponent,
        ProductPopupComponent,
        ProductDeletePopupComponent,
    ],
    entryComponents: [
        ProductComponent,
        ProductDialogComponent,
        ProductPopupComponent,
        ProductDeleteDialogComponent,
        ProductDeletePopupComponent,
    ],
    providers: [
        ProductService,
        ProductPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemProductModule {}
