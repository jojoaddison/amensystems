import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SlideShow } from './slide-show.model';
import { SlideShowPopupService } from './slide-show-popup.service';
import { SlideShowService } from './slide-show.service';

@Component({
    selector: 'jhi-slide-show-dialog',
    templateUrl: './slide-show-dialog.component.html'
})
export class SlideShowDialogComponent implements OnInit {

    slideShow: SlideShow;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private slideShowService: SlideShowService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.slideShow.id !== undefined) {
            this.subscribeToSaveResponse(
                this.slideShowService.update(this.slideShow));
        } else {
            this.subscribeToSaveResponse(
                this.slideShowService.create(this.slideShow));
        }
    }

    private subscribeToSaveResponse(result: Observable<SlideShow>) {
        result.subscribe((res: SlideShow) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SlideShow) {
        this.eventManager.broadcast({ name: 'slideShowListModification', content: 'OK'});
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
    selector: 'jhi-slide-show-popup',
    template: ''
})
export class SlideShowPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private slideShowPopupService: SlideShowPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.slideShowPopupService
                    .open(SlideShowDialogComponent as Component, params['id']);
            } else {
                this.slideShowPopupService
                    .open(SlideShowDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
