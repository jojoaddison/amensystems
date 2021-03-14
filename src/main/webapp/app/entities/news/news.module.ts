import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
})
export class AmensystemNewsModule {}
