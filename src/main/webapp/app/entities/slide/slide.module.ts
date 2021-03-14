import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from 'app/shared/shared.module';
import { SlideComponent } from './slide.component';
import { SlideDetailComponent } from './slide-detail.component';
import { SlideUpdateComponent } from './slide-update.component';
import { SlideDeleteDialogComponent } from './slide-delete-dialog.component';
import { slideRoute } from './slide.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(slideRoute)],
  declarations: [SlideComponent, SlideDetailComponent, SlideUpdateComponent, SlideDeleteDialogComponent],
  entryComponents: [SlideDeleteDialogComponent],
})
export class AmensystemSlideModule {}
