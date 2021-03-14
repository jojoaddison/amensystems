import { Component, OnInit, OnDestroy } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
=======
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> jhipster_upgrade

import { ISlide } from 'app/shared/model/slide.model';
import { SlideService } from './slide.service';
<<<<<<< HEAD
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { Tile } from '../../widgets';
=======
import { SlideDeleteDialogComponent } from './slide-delete-dialog.component';
>>>>>>> jhipster_upgrade

@Component({
  selector: 'jhi-slide',
  templateUrl: './slide.component.html',
})
export class SlideComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
    slides: Slide[];
    currentAccount: any;
    eventSubscriber: Subscription;
    tiles: Tile[] = [];
    title = 'Slide Management';
    tileConfig: {};
    slideshow: Slide[] = [];

    constructor(
        private slideService: SlideService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
        this.tileConfig = {
            grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
            speed: 1000,
            interval: 3000,
            point: {
            visible: true,
            pointStyles: `
                .ngxcarouselPoint {
                list-style-type: none;
                text-align: center;
                padding: 12px;
                margin: 0;
                white-space: nowrap;
                overflow: auto;
                box-sizing: border-box;
                }
                .ngxcarouselPoint li {
                display: inline-block;
                border-radius: 50%;
                border: 2px solid rgba(0, 0, 0, 0.55);
                padding: 4px;
                margin: 0 3px;
                transition-timing-function: cubic-bezier(.17, .67, .83, .67);
                transition: .4s;
                }
                .ngxcarouselPoint li.active {
                    background: #6b6b6b;
                    transform: scale(1.2);
                }
            `
            },
            load: 2,
            touch: true
        };
    }

    loadAll() {
        this.slideService.query().subscribe(
            (res: ResponseWrapper) => {
                this.slides = res.json;
                this.tiles = [];
                this.slides.forEach((slide) => {
                    this.tiles.push(new Tile(slide.id, slide.title, slide.description, slide.url, false));
                });
                console.log(this.tiles);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSlides();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Slide) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInSlides() {
        this.eventSubscriber = this.eventManager.subscribe('slideListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private createSlideShow() {
        console.log('create-slide-show');
        console.log(this.slideshow);
    }

    public onSlideSelected(tile: Tile) {
        console.log('on-tile-selected');
        console.log(tile);
        const slide = this.findSlideById(tile.id);
        if (tile.selected) {
            this.slideshow.push(slide);
        } else {
            const index = this.slides.findIndex((element) => element.id === slide.id);
            this.slideshow.splice(index, 1);
        }
    }

    private findSlideById(id: string): Slide {
        const slide = this.slides.find((element) => element.id === id);
        return slide;
    }

    private slideSelected(slide: Slide): boolean {
       const index = this.slides.findIndex((element) => element.id === slide.id);
        return index > -1;
    }
=======
  slides?: ISlide[];
  eventSubscriber?: Subscription;

  constructor(
    protected slideService: SlideService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.slideService.query().subscribe((res: HttpResponse<ISlide[]>) => (this.slides = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSlides();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISlide): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSlides(): void {
    this.eventSubscriber = this.eventManager.subscribe('slideListModification', () => this.loadAll());
  }

  delete(slide: ISlide): void {
    const modalRef = this.modalService.open(SlideDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.slide = slide;
  }
>>>>>>> jhipster_upgrade
}
