import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DigitalAsset } from './digital-asset.model';
import { DigitalAssetService } from './digital-asset.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-digital-asset',
    templateUrl: './digital-asset.component.html'
})
export class DigitalAssetComponent implements OnInit, OnDestroy {
digitalAssets: DigitalAsset[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private digitalAssetService: DigitalAssetService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.digitalAssetService.query().subscribe(
            (res: ResponseWrapper) => {
                this.digitalAssets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDigitalAssets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DigitalAsset) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInDigitalAssets() {
        this.eventSubscriber = this.eventManager.subscribe('digitalAssetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
