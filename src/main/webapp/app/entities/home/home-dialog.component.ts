import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Home, StateType } from './home.model';
import { HomePopupService } from './home-popup.service';
import { HomeService } from './home.service';
import { LocalStorage } from 'ng2-webstorage';
import { Tile } from '../../widgets';
import { SlideService, Slide } from '../slide';
import { ResponseWrapper } from '../../shared';
import { ProductService, Product } from '../product';
import { CategoryService, Category } from '../category';

@Component({
    selector: 'jhi-home-dialog',
    templateUrl: './home-dialog.component.html',
    styleUrls: ['../entities.component.css']
})
export class HomeDialogComponent implements OnInit {

    home: Home;
    homes: Home[];
    isSaving: boolean;
    tileConfig: {};

    slideTitle = 'Slides';
    @LocalStorage() slideTiles: Tile[];
    @LocalStorage() slides: Slide[];

    advertTitle = 'Adverts & Promotions';
    @LocalStorage() advertTiles: Tile[];
    @LocalStorage() adverts: Product[];

    categoryTitle = 'Product Categories';
    @LocalStorage() categoryTiles: Tile[];
    @LocalStorage() categories: Category[];

    constructor(
        private slideService: SlideService,
        private productService: ProductService,
        private categoryService: CategoryService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private homeService: HomeService,
        private eventManager: JhiEventManager
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

    public onSlideSelected(tile: Tile) {
        const slide = this.findSlideById(tile.id);
        if (tile.selected) {
            this.home.slides.push(slide);
        } else {
            const index = this.home.slides.findIndex((element) => element.id === slide.id);
            this.home.slides.splice(index, 1);
        }
    }

    private findSlideById(id: string): Slide {
        const slide = this.slides.find((element) => element.id === id);
        return slide;
    }

    private slideSelected(slide: Slide): boolean {
       const index = this.home.slides.findIndex((element) => element.id === slide.id);
        return index > -1;
    }

    public onAdvertSelected(tile: Tile) {
        const advert = this.findAdvertById(tile.id);
        if (tile.selected) {
            this.home.advert.push(advert);
        } else {
            const index = this.home.advert.findIndex((element) => element.id === advert.id);
            this.home.advert.splice(index, 1);
        }
    }

    private findAdvertById(id: string): Product {
        const advert = this.adverts.find((element) => element.id === id);
        return advert;
    }
    private advertSelected(advert: Product): boolean {
       const index = this.home.advert.findIndex((element) => element.id === advert.id);
        return index > -1;
    }

    public onCategorySelected(tile: Tile) {
        const category = this.findCategoryById(tile.id);
        if (tile.selected) {
            this.home.category.push(category);
        } else {
            const index = this.home.category.findIndex((element) => element.id === category.id);
            this.home.category.splice(index, 1);
        }
    }

    private findCategoryById(id: string): Product {
        const category = this.categories.find((element) => element.id === id);
        return category;
    }
    private categorySelected(category: Category): boolean {
       const index = this.home.category.findIndex((element) => element.id === category.id);
        return index > -1;
    }

    ngOnInit() {
        this.isSaving = false;
        this.homeService.query({}).subscribe((res) => {this.homes = res.json});
        this.initSlides();
        this.initAdverts();
        this.initCategories();
    }

    initCategories() {
        if (typeof (this.home.category) === 'undefined' || this.home.category === null) {
            this.home.category = [];
        }
        console.log(this.home.category);
        this.categoryService.query({}).subscribe(
            (res: ResponseWrapper) => {
                this.categories = res.json;
                this.categoryTiles = [];
                this.categories.forEach((category) => {
                    const url = 'data:' + category.photoContentType + ';base64,' + category.photo;
                    category.link = url;
                    this.categoryTiles.push(new Tile(category.id, category.name, category.description, url, this.categorySelected(category)));
                });
                console.log(this.categoryTiles);
                console.log(this.categories);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    initAdverts() {
        if (typeof (this.home.advert) === 'undefined' || this.home.advert === null) {
            this.home.advert = [];
        }
        console.log(this.home.advert);
        this.productService.query({}).subscribe(
            (res: ResponseWrapper) => {
                this.adverts = res.json;
                this.advertTiles = [];
                this.adverts.forEach((advert) => {
                    const url = 'data:' + advert.photoContentType + ';base64,' + advert.photo;
                    advert.url = url;
                    this.advertTiles.push(new Tile(advert.id, advert.name, advert.category, url, this.advertSelected(advert)));
                });
                console.log(this.advertTiles);
                console.log(this.adverts);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    initSlides() {
        if (typeof (this.home.slides) === 'undefined' || this.home.slides === null) {
            this.home.slides = [];
        }
        console.log(this.home.slides);
        this.slideService.query().subscribe(
            (res: ResponseWrapper) => {
                this.slides = res.json;
                this.slideTiles = [];
                this.slides.forEach((slide) => {
                    this.slideTiles.push(new Tile(slide.id, slide.title, slide.description, slide.url, this.slideSelected(slide)));
                });
                console.log(this.slideTiles);
                console.log(this.slides);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        console.log(this.home);
        const state = this.home.state.toString();
        if (state === 'CURRENT') {
            this.homes.forEach((element: Home) => {
                if (element.state !== null && element.state.toString() === 'CURRENT') {
                    console.log('<<found>>');
                    element.state = StateType.PUBLISH;
                    console.log(element);
                    this.homeService.update(element);
                }
            });
        }

        if (this.home.id !== undefined) {
            this.subscribeToSaveResponse(
                this.homeService.update(this.home));
        } else {
            this.subscribeToSaveResponse(
                this.homeService.create(this.home));
        }
    }

    private subscribeToSaveResponse(result: Observable<Home>) {
        result.subscribe((res: Home) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Home) {
        this.eventManager.broadcast({ name: 'homeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-home-popup',
    template: ''
})
export class HomePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private homePopupService: HomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.homePopupService
                    .open(HomeDialogComponent as Component, params['id']);
            } else {
                this.homePopupService
                    .open(HomeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
