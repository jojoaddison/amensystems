import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AmensystemSharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [AmensystemSharedModule, WidgetsModule, RouterModule.forRoot([HOME_ROUTE], { useHash: true })],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AmensystemHomeModule {}
