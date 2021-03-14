import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home-delete-dialog.component.html',
})
export class HomeDeleteDialogComponent {
  home?: IHome;

  constructor(protected homeService: HomeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.homeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('homeListModification');
      this.activeModal.close();
    });
  }
}
