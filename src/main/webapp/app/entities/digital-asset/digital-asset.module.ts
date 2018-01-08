import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from '../../shared';
import {
    DigitalAssetService,
    DigitalAssetPopupService,
    DigitalAssetComponent,
    DigitalAssetDetailComponent,
    DigitalAssetDialogComponent,
    DigitalAssetPopupComponent,
    DigitalAssetDeletePopupComponent,
    DigitalAssetDeleteDialogComponent,
    digitalAssetRoute,
    digitalAssetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...digitalAssetRoute,
    ...digitalAssetPopupRoute,
];

@NgModule({
    imports: [
        AmensystemSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DigitalAssetComponent,
        DigitalAssetDetailComponent,
        DigitalAssetDialogComponent,
        DigitalAssetDeleteDialogComponent,
        DigitalAssetPopupComponent,
        DigitalAssetDeletePopupComponent,
    ],
    entryComponents: [
        DigitalAssetComponent,
        DigitalAssetDialogComponent,
        DigitalAssetPopupComponent,
        DigitalAssetDeleteDialogComponent,
        DigitalAssetDeletePopupComponent,
    ],
    providers: [
        DigitalAssetService,
        DigitalAssetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemDigitalAssetModule {}
