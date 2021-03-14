import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from 'app/shared/shared.module';
import { SlideShowComponent } from './slide-show.component';
import { SlideShowDetailComponent } from './slide-show-detail.component';
import { SlideShowUpdateComponent } from './slide-show-update.component';
import { SlideShowDeleteDialogComponent } from './slide-show-delete-dialog.component';
import { slideShowRoute } from './slide-show.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(slideShowRoute)],
  declarations: [SlideShowComponent, SlideShowDetailComponent, SlideShowUpdateComponent, SlideShowDeleteDialogComponent],
  entryComponents: [SlideShowDeleteDialogComponent],
})
export class AmensystemSlideShowModule {}
