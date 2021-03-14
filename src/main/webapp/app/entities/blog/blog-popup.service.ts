import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';

@Injectable()
export class BlogPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private blogService: BlogService

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
                this.blogService.find(id).subscribe((blog) => {
                    blog.createdDate = this.datePipe
                        .transform(blog.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    blog.modifiedDate = this.datePipe
                        .transform(blog.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.blogModalRef(component, blog);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.blogModalRef(component, new Blog());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    blogModalRef(component: Component, blog: Blog): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.blog = blog;
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
