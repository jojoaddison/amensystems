import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
    imports: [
        AmensystemSharedModule,
        WidgetsModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmensystemHomeModule {}
