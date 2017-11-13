import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Slide } from './slide.model';
import { SlidePopupService } from './slide-popup.service';
import { SlideService } from './slide.service';

@Component({
    selector: 'jhi-slide-delete-dialog',
    templateUrl: './slide-delete-dialog.component.html'
})
export class SlideDeleteDialogComponent {

    slide: Slide;

    constructor(
        private slideService: SlideService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.slideService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'slideListModification',
                content: 'Deleted an slide'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slide-delete-popup',
    template: ''
})
export class SlideDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private slidePopupService: SlidePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.slidePopupService
                .open(SlideDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
