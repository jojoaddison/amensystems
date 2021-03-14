import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DigitalAsset } from './digital-asset.model';
import { DigitalAssetPopupService } from './digital-asset-popup.service';
import { DigitalAssetService } from './digital-asset.service';

@Component({
    selector: 'jhi-digital-asset-dialog',
    templateUrl: './digital-asset-dialog.component.html'
})
export class DigitalAssetDialogComponent implements OnInit {

    digitalAsset: DigitalAsset;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private digitalAssetService: DigitalAssetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.digitalAsset.id !== undefined) {
            this.subscribeToSaveResponse(
                this.digitalAssetService.update(this.digitalAsset));
        } else {
            this.subscribeToSaveResponse(
                this.digitalAssetService.create(this.digitalAsset));
        }
    }

    private subscribeToSaveResponse(result: Observable<DigitalAsset>) {
        result.subscribe((res: DigitalAsset) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DigitalAsset) {
        this.eventManager.broadcast({ name: 'digitalAssetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-digital-asset-popup',
    template: ''
})
export class DigitalAssetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private digitalAssetPopupService: DigitalAssetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.digitalAssetPopupService
                    .open(DigitalAssetDialogComponent as Component, params['id']);
            } else {
                this.digitalAssetPopupService
                    .open(DigitalAssetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
