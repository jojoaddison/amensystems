import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Home } from './home.model';
import { HomePopupService } from './home-popup.service';
import { HomeService } from './home.service';

@Component({
    selector: 'jhi-home-delete-dialog',
    templateUrl: './home-delete-dialog.component.html'
})
export class HomeDeleteDialogComponent {

    home: Home;

    constructor(
        private homeService: HomeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.homeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'homeListModification',
                content: 'Deleted an home'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-home-delete-popup',
    template: ''
})
export class HomeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private homePopupService: HomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.homePopupService
                .open(HomeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
