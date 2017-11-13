import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { News } from './news.model';
import { NewsService } from './news.service';

@Injectable()
export class NewsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private newsService: NewsService

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
                this.newsService.find(id).subscribe((news) => {
                    news.createdDate = this.datePipe
                        .transform(news.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    news.modifiedDate = this.datePipe
                        .transform(news.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.newsModalRef(component, news);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.newsModalRef(component, new News());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    newsModalRef(component: Component, news: News): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.news = news;
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
