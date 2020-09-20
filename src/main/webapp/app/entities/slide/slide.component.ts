import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Slide } from './slide.model';
import { SlideService } from './slide.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { Tile } from '../../widgets';

@Component({
    selector: 'jhi-slide',
    templateUrl: './slide.component.html'
})
export class SlideComponent implements OnInit, OnDestroy {
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
}
