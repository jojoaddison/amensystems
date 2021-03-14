import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DigitalAsset } from './digital-asset.model';
import { DigitalAssetPopupService } from './digital-asset-popup.service';
import { DigitalAssetService } from './digital-asset.service';

@Component({
    selector: 'jhi-digital-asset-delete-dialog',
    templateUrl: './digital-asset-delete-dialog.component.html'
})
export class DigitalAssetDeleteDialogComponent {

    digitalAsset: DigitalAsset;

    constructor(
        private digitalAssetService: DigitalAssetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.digitalAssetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'digitalAssetListModification',
                content: 'Deleted an digitalAsset'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-digital-asset-delete-popup',
    template: ''
})
export class DigitalAssetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private digitalAssetPopupService: DigitalAssetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.digitalAssetPopupService
                .open(DigitalAssetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
