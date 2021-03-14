import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';
import { HomeDeleteDialogComponent } from './home-delete-dialog.component';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  homes?: IHome[];
  eventSubscriber?: Subscription;

  constructor(protected homeService: HomeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.homeService.query().subscribe((res: HttpResponse<IHome[]>) => (this.homes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHomes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHome): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHomes(): void {
    this.eventSubscriber = this.eventManager.subscribe('homeListModification', () => this.loadAll());
  }

  delete(home: IHome): void {
    const modalRef = this.modalService.open(HomeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.home = home;
  }
}
