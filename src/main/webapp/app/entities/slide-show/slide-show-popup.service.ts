import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SlideShow } from './slide-show.model';
import { SlideShowService } from './slide-show.service';

@Injectable()
export class SlideShowPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private slideShowService: SlideShowService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.slideShowService.find(id).subscribe((slideShow) => {
                    slideShow.createdDate = this.datePipe
                        .transform(slideShow.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    slideShow.modifiedDate = this.datePipe
                        .transform(slideShow.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.slideShowModalRef(component, slideShow);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.slideShowModalRef(component, new SlideShow());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    slideShowModalRef(component: Component, slideShow: SlideShow): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.slideShow = slideShow;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
