import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlideShow } from 'app/shared/model/slide-show.model';
import { SlideShowService } from './slide-show.service';

@Component({
  templateUrl: './slide-show-delete-dialog.component.html',
})
export class SlideShowDeleteDialogComponent {
  slideShow?: ISlideShow;

  constructor(protected slideShowService: SlideShowService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.slideShowService.delete(id).subscribe(() => {
      this.eventManager.broadcast('slideShowListModification');
      this.activeModal.close();
    });
  }
}
