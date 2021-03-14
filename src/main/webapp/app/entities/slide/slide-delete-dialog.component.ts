import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlide } from 'app/shared/model/slide.model';
import { SlideService } from './slide.service';

@Component({
  templateUrl: './slide-delete-dialog.component.html',
})
export class SlideDeleteDialogComponent {
  slide?: ISlide;

  constructor(protected slideService: SlideService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.slideService.delete(id).subscribe(() => {
      this.eventManager.broadcast('slideListModification');
      this.activeModal.close();
    });
  }
}
