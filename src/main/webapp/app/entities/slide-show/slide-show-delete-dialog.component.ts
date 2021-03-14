import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SlideShow } from './slide-show.model';
import { SlideShowPopupService } from './slide-show-popup.service';
import { SlideShowService } from './slide-show.service';

@Component({
    selector: 'jhi-slide-show-delete-dialog',
    templateUrl: './slide-show-delete-dialog.component.html'
})
export class SlideShowDeleteDialogComponent {

    slideShow: SlideShow;

    constructor(
        private slideShowService: SlideShowService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.slideShowService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'slideShowListModification',
                content: 'Deleted an slideShow'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slide-show-delete-popup',
    template: ''
})
export class SlideShowDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private slideShowPopupService: SlideShowPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.slideShowPopupService
                .open(SlideShowDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
