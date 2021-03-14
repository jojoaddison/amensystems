import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISlideShow } from 'app/shared/model/slide-show.model';
import { SlideShowService } from './slide-show.service';
import { SlideShowDeleteDialogComponent } from './slide-show-delete-dialog.component';

@Component({
  selector: 'jhi-slide-show',
  templateUrl: './slide-show.component.html',
})
export class SlideShowComponent implements OnInit, OnDestroy {
  slideShows?: ISlideShow[];
  eventSubscriber?: Subscription;

  constructor(protected slideShowService: SlideShowService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.slideShowService.query().subscribe((res: HttpResponse<ISlideShow[]>) => (this.slideShows = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSlideShows();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISlideShow): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSlideShows(): void {
    this.eventSubscriber = this.eventManager.subscribe('slideShowListModification', () => this.loadAll());
  }

  delete(slideShow: ISlideShow): void {
    const modalRef = this.modalService.open(SlideShowDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.slideShow = slideShow;
  }
}
