import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DigitalAsset } from './digital-asset.model';
import { DigitalAssetService } from './digital-asset.service';

@Injectable()
export class DigitalAssetPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private digitalAssetService: DigitalAssetService

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
                this.digitalAssetService.find(id).subscribe((digitalAsset) => {
                    digitalAsset.createdDate = this.datePipe
                        .transform(digitalAsset.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    digitalAsset.modifiedDate = this.datePipe
                        .transform(digitalAsset.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.digitalAssetModalRef(component, digitalAsset);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.digitalAssetModalRef(component, new DigitalAsset());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    digitalAssetModalRef(component: Component, digitalAsset: DigitalAsset): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.digitalAsset = digitalAsset;
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
