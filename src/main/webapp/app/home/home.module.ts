import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

<<<<<<< HEAD
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
=======
import { AmensystemSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
>>>>>>> jhipster_upgrade
})
export class AmensystemHomeModule {}
