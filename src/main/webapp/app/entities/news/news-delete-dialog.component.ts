import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INews } from 'app/shared/model/news.model';
import { NewsService } from './news.service';

@Component({
  templateUrl: './news-delete-dialog.component.html',
})
export class NewsDeleteDialogComponent {
  news?: INews;

  constructor(protected newsService: NewsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.newsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('newsListModification');
      this.activeModal.close();
    });
  }
}
