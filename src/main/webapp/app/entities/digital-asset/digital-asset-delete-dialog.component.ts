import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDigitalAsset } from 'app/shared/model/digital-asset.model';
import { DigitalAssetService } from './digital-asset.service';

@Component({
  templateUrl: './digital-asset-delete-dialog.component.html',
})
export class DigitalAssetDeleteDialogComponent {
  digitalAsset?: IDigitalAsset;

  constructor(
    protected digitalAssetService: DigitalAssetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.digitalAssetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('digitalAssetListModification');
      this.activeModal.close();
    });
  }
}
