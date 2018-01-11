import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { SlideShow } from './slide-show.model';
import { SlideShowService } from './slide-show.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-slide-show',
    templateUrl: './slide-show.component.html'
})
export class SlideShowComponent implements OnInit, OnDestroy {
slideShows: SlideShow[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private slideShowService: SlideShowService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.slideShowService.query().subscribe(
            (res: ResponseWrapper) => {
                this.slideShows = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSlideShows();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SlideShow) {
        return item.id;
    }
    registerChangeInSlideShows() {
        this.eventSubscriber = this.eventManager.subscribe('slideShowListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
