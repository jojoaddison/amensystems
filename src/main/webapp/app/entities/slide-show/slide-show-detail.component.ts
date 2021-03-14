import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SlideShow } from './slide-show.model';
import { SlideShowService } from './slide-show.service';

@Component({
    selector: 'jhi-slide-show-detail',
    templateUrl: './slide-show-detail.component.html'
})
export class SlideShowDetailComponent implements OnInit, OnDestroy {

    slideShow: SlideShow;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private slideShowService: SlideShowService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSlideShows();
    }

    load(id) {
        this.slideShowService.find(id).subscribe((slideShow) => {
            this.slideShow = slideShow;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSlideShows() {
        this.eventSubscriber = this.eventManager.subscribe(
            'slideShowListModification',
            (response) => this.load(this.slideShow.id)
        );
    }
}
