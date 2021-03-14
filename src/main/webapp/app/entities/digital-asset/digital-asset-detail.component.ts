import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DigitalAsset } from './digital-asset.model';
import { DigitalAssetService } from './digital-asset.service';

@Component({
    selector: 'jhi-digital-asset-detail',
    templateUrl: './digital-asset-detail.component.html'
})
export class DigitalAssetDetailComponent implements OnInit, OnDestroy {

    digitalAsset: DigitalAsset;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private digitalAssetService: DigitalAssetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDigitalAssets();
    }

    load(id) {
        this.digitalAssetService.find(id).subscribe((digitalAsset) => {
            this.digitalAsset = digitalAsset;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDigitalAssets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'digitalAssetListModification',
            (response) => this.load(this.digitalAsset.id)
        );
    }
}
